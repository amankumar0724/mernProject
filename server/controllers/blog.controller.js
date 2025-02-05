import Post from "../models/post.model.js"

export const publishBlog = async (req,res) => {
    // first we need to validate : access token
    try {
        const post = await new Post(req.body);
        post.save();
        return res.status(200).json({msg:"Post saved successfully."});
    } catch (error) {
        return res.status(500).json(error);        
    }
}
export const getAllBlogs = async (req,res) => {
    const _category = req.query.category;
    let allPosts;
    try {
        if(_category) {
            allPosts = await Post.find({category:_category});
        } else {
            allPosts = await Post.find({})//leaving empty object will return all documents
        }
        return res.status(200).json(allPosts);
    } catch (error) {
        return res.status(500).json({msg:`Cannot fetch all blogs ${error.msg}`});
    }
}