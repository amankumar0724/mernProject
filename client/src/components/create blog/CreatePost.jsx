import React, { useState, useContext, useEffect } from 'react';
import { 
    Box, 
    styled, 
    FormControl, 
    InputBase, 
    Button, 
    TextareaAutosize, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    DialogActions,
    CircularProgress
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useNavigate, useLocation } from 'react-router-dom';
import { DataContext } from '../../contextAPI/DataProvider.jsx';
import axios from 'axios';
import { API } from '../../services/api.js';
import { ErrorDialog } from '../../services/common-services.js';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 1,
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
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

const LoaderContainer = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40vh;
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
    const [loading, setLoading] = useState(false);
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const { account } = useContext(DataContext);
    const url = post.blogImage ? post.blogImage : 'hero2.jpg';
    
    const navigate = useNavigate();

    useEffect(() => {
        const uploadImage = async () => {
            if (file) {
                setLoading(true);
                const formData = new FormData();
                formData.append('name', file.name);
                formData.append('file', file);

                try {
                    const res = await axios.post('http://localhost:8000/file/upload', formData);
                    setPost((prev) => ({ ...prev, blogImage: res.data.url }));
                } catch (error) {
                    console.error('Error uploading image:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        uploadImage();
        setPost((prev) => ({
            ...prev,
            category: location.search?.split('=')[1] || 'All',
            username: account.username,
        }));
    }, [file]);

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const publishBlog = async () => {
        if (!post.title.trim() || !post.content.trim()) {
            setErrorDialogOpen(true);
            return;
        }

        setLoading(true);
        const response = await API.createPost(post);
        setLoading(false);

        if (response.isSuccess) {
            navigate('/');
        } else {
            console.log('ERROR during publishing blog');
        }
    };

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
                <Button variant='contained' onClick={publishBlog} disabled={loading}>
                    {/* {loading ? <CircularProgress size={24} /> : 'Publish'} */}
                    Publish
                </Button>
            </StyledForm>

            {loading ? (
                <LoaderContainer>
                    <CircularProgress />
                </LoaderContainer>
            ) : (
                <Content 
                    minRows={5}
                    placeholder='Write your blog ...'
                    onChange={handleChange}
                    name='content'
                />
            )}

            <ErrorDialog 
                open={errorDialogOpen} 
                onClose={() => setErrorDialogOpen(false)} 
                message="Please enter a title and content before publishing your blog."
            />

            {/* Error Dialog */}
            {/* <Dialog open={errorDialogOpen} onClose={() => setErrorDialogOpen(false)}>
                <DialogTitle>ThinkSync</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please enter both a title and content before publishing your blog.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setErrorDialogOpen(false)} autoFocus>OK</Button>
                </DialogActions>
            </Dialog> */}
        </Container>
    );
}

export default CreatePost;
