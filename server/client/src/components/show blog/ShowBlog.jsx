import { useState, useEffect, useContext } from 'react';
import { Box, CircularProgress, Typography, styled } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams, Link, useNavigate } from 'react-router-dom'
import { API } from '../../services/api.js';
import { DataContext } from '../../contextAPI/DataProvider.jsx';
import Comments from './Comments.jsx';

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

const Edit = styled(EditIcon)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 15px;
`;

const Delete = styled(DeleteIcon)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 15px;
`;

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
`;

const Author = styled(Box)(({ theme }) => ({
    color: '#878787',
    display: 'flex',
    margin: '20px 0',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    },
}));
const LoaderContainer = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
`;

const ShowBlog = () => {
    const url = '/hero2.jpg';
    
    const [post, setPost] = useState({});
    const [loading,setLoading] = useState(true);
    const { account } = useContext(DataContext);
    const { id } = useParams();
    const navigate = useNavigate(); 
    
    useEffect(() => {
        const getPostData = async () => {
            setLoading(true);
            const response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
            setLoading(false);
        }
        getPostData();
    }, []);

    const deleteBlog = async () => {
        
        setLoading(true)
        const response = await API.deletePost(post._id);
        if(response.isSuccess) {
            navigate('/');
        }
        setLoading(false)
    }

    return (
        <Container>
            {
                loading ? (
                    <LoaderContainer>
                        <CircularProgress sx={{ color: '#c04f4f' }} />
                    </LoaderContainer>
                ) : (
                    <>
                        <Image src={post.blogImage || url} alt="post" />
                    <Box style={{ float: 'right' }}>
                        {   
                            account.username === post.username && 
                            <>  
                                <Link to={`/update-post/${post._id}`}>
                                    <Edit color="primary"/>
                                </Link>
                                <Link>
                                    <Delete color="error" onClick={deleteBlog}/>
                                </Link>
                            </>
                        }
                    </Box>
                    <Heading>{post.title}</Heading>
                    <Author>
                        <Typography>Author: <span style={{fontWeight: 600}}>{post.username}</span></Typography>
                        <Typography style={{marginLeft: 'auto'}}>{new Date(post.createdDate).toDateString()}</Typography>
                    </Author>
                    <Typography>{post.content}</Typography>
                    <Comments post={post}/>
                    </>
                )
            }
            
        </Container>
    )
}

export default ShowBlog;
