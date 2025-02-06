import { useEffect, useState } from "react";
import {API} from '../../services/api.js';
import {Box, Grid} from '@mui/material' 
import Post from "./Post.jsx";
import {useSearchParams,Link} from 'react-router-dom';

const AllPosts = () => {
    const [posts,setPosts] = useState([]);
    const [searchParams] = useSearchParams();
    const _category = searchParams.get('category');
    useEffect(() => {
        const fetchAllPosts = async () => {//this will be a GET api request
            const response = await API.getAllPosts({category:_category || ''});
            if(response.isSuccess) {
                setPosts(response.data);
            }
        } 
        fetchAllPosts();
    },[_category]);
    return (
        <>
            {
                posts && posts.length > 0 ? posts.map(post => (
                    <Grid item lg={3} sm={4} xs={12} key={post._id}>
                        <Link to={`show-blog/${post._id}`} style={{textDecoration:'none',color:'inherit'}}>
                            <Post post={post} />
                        </Link>
                    </Grid>
                ))
                :<Box style={{fontSize:18, color:'#878787', margin:'30px 80px'}}>    
                    No blogs available
                </Box>

            }
        </>
    )
}
export default AllPosts;