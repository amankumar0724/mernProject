import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';
import { DataContext } from '../../contextAPI/DataProvider';
import { API } from '../../services/api';
import CommentLayout from './CommentLayout';


const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px;
    width: 100%; 
    margin: 0 20px;
`;

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}

const Comments = ({ post }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png'

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState(initialValue);
    const [toggleState, setToggleState] = useState(false);

    const { account } = useContext(DataContext);

    useEffect(() => {
        try {
            const fetchAllComments = async () => {
                const response = await API.getAllComments(post._id);
                if (response.isSuccess) {
                    setComments(response.data);
                }
            }    
            fetchAllComments();
        } catch (error) {
            console.log(`Error in fetching all comments ${error}`);
        }
    }, [post,toggleState]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        });
    }

    const addComment = async() => {
        const res = await API.addNewComment(comment);
        if(res.isSuccess) {
            setComment(initialValue)
        }
        setToggleState(prevState => !prevState);
    }
    
    return (
        <Box>
            <Container>
                <Image src={url} alt="dp" />   
                <StyledTextArea 
                    minRows={5} 
                    placeholder="what's on your mind?"
                    onChange={(e) => handleChange(e)} 
                    value={comment.comments}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="medium" 
                    style={{ height: 40 }}
                    onClick={(e) => addComment(e)}
                >Comment</Button>             
            </Container>
            <Box>
                {
                    comments && comments.length > 0 && comments.map((comment,index) => (
                        <CommentLayout key={index} comment={comment} setToggleState={setToggleState} />
                    ))
                }
            </Box>
        </Box>
    )
}

export default Comments;