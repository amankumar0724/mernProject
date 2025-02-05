import React, { useState, useContext, useEffect } from 'react';
import { Box, styled, FormControl, InputBase, Button, TextareaAutosize } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useNavigate, useLocation } from 'react-router-dom';
import { DataContext } from '../../contextAPI/DataProvider.jsx';
import axios from 'axios';
import {API} from '../../services/api.js';

const Container = styled(Box)`
    margin: 50px 100px;
`;

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const StyledForm = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`;

const Content = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;

const initialBlog = {
    title: '',
    content: '',
    username: '',
    blogImage: '',
    category: '',
    createdDate: new Date(),
};

function CreatePost() {
    const location = useLocation();
    const [post, setPost] = useState(initialBlog);
    const [file, setFile] = useState(null);
    const { account } = useContext(DataContext);
    const url = post.blogImage 
    ? post.blogImage 
    : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    
    const navigate = useNavigate();
    useEffect(() => {
        const uploadImage = async () => {
            if (file) {
                const formData = new FormData();
                formData.append('name', file.name);
                formData.append('file', file);

                try {
                    const res = await axios.post('http://localhost:8000/file/upload', formData);
                    // const res = await API.uploadFile(formData);
                    setPost((prev) => ({ ...prev, blogImage: res.data.url })); // Store Cloudinary URL
                } catch (error) {
                    console.error('Error uploading image:', error);
                }
            }
        };

        uploadImage();
        setPost((prev) => ({
            ...prev,
            category: location.search?.split('=')[1] || 'All',
            username: account.username
        }));
    }, [file]);

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const publishBlog = async () => {
        const response = await API.createPost(post);
        if(response.isSuccess) {
            navigate('/');
        } else {
            console.log('ERROR during publishing blog');
        }
    }

    return (
        <Container>
            <Image src={url} alt='post image' />
            <StyledForm>
                <label htmlFor='fileInput'>
                    <AddPhotoAlternateIcon fontSize='large' color='action' />
                </label>
                <input 
                    type="file" 
                    id='fileInput'
                    style={{ display: 'none' }}    
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTextField  
                    placeholder='Title' 
                    onChange={handleChange}
                    name='title'
                />
                <Button variant='contained' onClick={publishBlog}>Publish</Button>
            </StyledForm>
            <Content 
                minRows={5}
                placeholder='Write your blog ...'
                onChange={handleChange}
                name='content'
            />
        </Container>
    );
}

export default CreatePost;
