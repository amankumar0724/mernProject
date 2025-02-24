import { styled, Box, Typography } from '@mui/material';

const Container = styled(Box)`
    border: 1px solid #d3cede;
    border-radius: 10px;
    margin: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 350px;
    transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
    border: 4px solid rgb(231, 231, 206);
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
        border: 4px solid rgb(223, 177, 70);
        background-color: rgb(235, 205, 153)        
    }
    & > img, & > p {
        padding: 0 5px 5px 5px;
    }
`;

const Image = styled('img')({
    width: '100%',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
    height: 150
});

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Heading = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
`;

const Details = styled(Typography)`
    font-size: 14px;
    word-break: break-word;
`;

const Post = ({ post }) => {

    const url = post.blogImage 
        ? post.blogImage 
        : 'hero2.jpg';
    
    const addEllipsis = (str, limit) => {
        return str.length > limit ? str.substring(0, limit) + '...' : str;
    } 

    return (
        <Container>
            <Image src={url} alt="post" />
            <Text>{post.category}</Text>
            <Heading>{addEllipsis(post.title, 30)}</Heading>
            <Text>Author: {post.username}</Text>
            <Details>{addEllipsis(post.content, 68)}</Details>
        </Container>
    )
}

export default Post;
