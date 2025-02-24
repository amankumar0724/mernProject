import { useState, useEffect, useContext } from 'react';
import { 
    Box, 
    TextareaAutosize, 
    Button, 
    styled,
    CircularProgress
} from '@mui/material';
import { DataContext } from '../../contextAPI/DataProvider';
import { API } from '../../services/api';
import CommentLayout from './CommentLayout';
import { ErrorDialog } from '../../services/common-services';

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

const LoaderBox = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
`;

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
};

const Comments = ({ post }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png';

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState(initialValue);
    const [toggleState, setToggleState] = useState(false);
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const { account } = useContext(DataContext);

    useEffect(() => {
        if (!post || !post._id) return;
        
        const fetchAllComments = async () => {
            setLoading(true);
            const response = await API.getAllComments(post._id);
            if (response.isSuccess) {
                setComments(response.data);
            }
            setLoading(false);
        };
        
        fetchAllComments();
    }, [post, toggleState]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        });
    };

    const addComment = async () => {
        if (!comment.comments.trim()) {
            setErrorDialogOpen(true);
            return;
        }
        try {
            const res = await API.addNewComment(comment);
            if (res.isSuccess) {
                setComment(initialValue);
            }
            setToggleState(prevState => !prevState);
        } catch (error) {
            setErrorDialogOpen(true);
        }
    };
    
    return (
        <Box>
            <Container>
                <Image src={url} alt="dp" />   
                <StyledTextArea 
                    minRows={5} 
                    placeholder="what's on your mind?"
                    onChange={handleChange} 
                    value={comment.comments}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="medium" 
                    style={{ height: 40 }}
                    onClick={addComment}
                >Comment</Button>             
            </Container>
            {loading ? (
                <LoaderBox>
                    <CircularProgress sx={{color:'#c04f4f'}}/>
                </LoaderBox>
            ) : (
                <Box>
                    {comments.length > 0 && comments.map((comment, index) => (
                        <CommentLayout key={index} comment={comment} setToggleState={setToggleState} />
                    ))}
                </Box>
            )}
            <ErrorDialog 
                open={errorDialogOpen} 
                onClose={() => setErrorDialogOpen(false)} 
                message="No comment written before posting."
            />
        </Box>
    );
};

export default Comments;
