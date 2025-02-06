import { useState, useEffect, useContext } from 'react';
import { Box, Typography, styled } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams,Link,useNavigate } from 'react-router-dom'
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

const ShowBlog = () => {
    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    
    const [post, setPost] = useState({});
    const { account } = useContext(DataContext);
    const { id } = useParams();
    const navigate = useNavigate(); 
    
    useEffect(() => {
        const getPostData = async () => {
            const response = await API.getPostById(id);
            // console.log(response.data)
            if (response.isSuccess) {
                setPost(response.data);
            }
        }
        getPostData();
    }, []);

    const deleteBlog = async () => {
        const response = await API.deletePost(post._id);
        if(response.isSuccess) {
            navigate('/');
        }
    }

    return (
        <Container>
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
        </Container>
    )
}

export default ShowBlog;

// const ShowBlog = () => {
//     return (
//         <div>Hello </div>
//     )   
// }
// export default ShowBlog;