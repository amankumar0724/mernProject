import { Typography, Box, styled } from "@mui/material";
import { useContext } from "react";
import { Delete } from '@mui/icons-material';
import { DataContext } from "../../contextAPI/DataProvider";
import { API } from "../../services/api";


const Component = styled(Box)`
    margin-top: 30px;
    background: #F5F5F5;
    padding: 10px;
`;

const Container = styled(Box)`
    display: flex;
    margin-bottom: 5px;
`;

const Name = styled(Typography)`
    font-weight: 600,
    font-size: 18px;
    margin-right: 20px;
`;

const StyledDate = styled(Typography)`
    font-size: 14px;
    color: #878787;
`;

const DeleteIcon = styled(Delete)`
    margin-left: auto;
`;

const CommentLayout = ({ comment, setToggleState }) => {

    const { account } = useContext(DataContext);
    
    const deleteComm = async () => {
        const response = await API.deleteComment(comment._id);
        if(response.isSuccess) {
            setToggleState(prevState => !prevState);
        }
    }

    return (
        <Component>
            <Container>
                <Name>{comment.name}</Name>
                <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
                { comment.name === account.username && <DeleteIcon onClick={() => deleteComm()} cursor='pointer'/> }
            </Container>
            <Typography>{comment.comments}</Typography>
        </Component>
    )
}

export default CommentLayout;