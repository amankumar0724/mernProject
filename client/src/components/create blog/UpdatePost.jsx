import React, { useState, useContext, useEffect } from 'react';
import { Box, styled, FormControl, InputBase, Button, TextareaAutosize } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { DataContext } from '../../contextAPI/DataProvider.jsx';
import axios from 'axios';
import {API} from '../../services/api.js';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 1
    },
}));

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

function UpdatePost() {
    const location = useLocation();
    const [post, setPost] = useState(initialBlog);
    const [file, setFile] = useState(null);
    const { account } = useContext(DataContext);
    const url = post.blogImage 
    ? post.blogImage 
    : 'hero2.jpg';
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const response = await API.getPostById(id);
            if(response.isSuccess) {
                setPost(response.data);
            }
        }
        getData();
    },[])

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

    const updateBlog = async () => {
        const response = await API.updatePost(post);
        if(response.isSuccess) {
            navigate(`/show-blog/${id}`);
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
                    value={post.title}
                    onChange={handleChange}
                    name='title'
                />
                <Button variant='contained' onClick={updateBlog}>Update</Button>
            </StyledForm>
            <Content 
                minRows={5}
                value={post.content}
                placeholder='Write your blog ...'
                onChange={handleChange}
                name='content'
            />
        </Container>
    );
}

export default UpdatePost;
