import { useEffect, useState } from "react";
import { API } from '../../services/api.js';
import { Box, CircularProgress, Grid } from '@mui/material';
import Post from "./Post.jsx";
import { useSearchParams, Link } from 'react-router-dom';
import { styled } from "@mui/system";

const LoaderContainer = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Full screen height */
    width: 100%;
`;

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const _category = searchParams.get('category');

    useEffect(() => {
        const fetchAllPosts = async () => {
            setLoading(true);
            const response = await API.getAllPosts({ category: _category || '' });
            if (response.isSuccess) {
                setPosts(response.data);
            }
            setLoading(false);
        };
        fetchAllPosts();
    }, [_category]);

    return (
        <>
            {loading ? (
                <LoaderContainer>
                    <CircularProgress sx={{ color: '#c04f4f' }} />
                </LoaderContainer>
            ) : (
                <>
                    {posts && posts.length > 0 ? (
                        <Grid container spacing={2} sx={{ padding: '20px' }}>
                            {posts.map(post => (
                                <Grid item lg={3} sm={4} xs={12} key={post._id}>
                                    <Link to={`show-blog/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <Post post={post} />
                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Box sx={{ fontSize: 18, color: '#878787', margin: '30px auto', textAlign: 'center' }}>
                            No blogs available
                        </Box>
                    )}
                </>
            )}
        </>
    );
};

export default AllPosts;
