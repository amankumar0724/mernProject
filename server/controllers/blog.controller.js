import Post from "../models/post.model.js"

export const publishBlog = async (req,res) => {
    // first we need to validate : access token
    try {
        const post = await new Post(req.body);
        post.save();
        return res.status(200).json({msg:"Post saved successfully."});
    } catch (error) {
        console.log(error);
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
        console.log(error);
        return res.status(500).json({msg:`Cannot fetch all blogs ${error.msg}`});
    }
}
export const getBlogById = async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:`Cannot fetch this blog ${error.msg}`});
    }
}
export const updateBlog = async(req,res) => {
    try {   
        const post = await Post.findById(req.params.id);
        if(!post) {
            return res.status(500).json({msg:`Post not found`}) 
        }
        // {$set}  = when we need to replace any object in an array 
        // {$addToSet}  = when we need to append any object in an array 
        await Post.findByIdAndUpdate(req.params.id,{$set: req.body})//{$set},{$addToSet}
        return res.status(200).json({msg:"Blog updated successfully ! ! !"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:`Cannot update this blog ${error.msg}`}) 
    }
}
export const deleteBlog = async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) {
            return res.status(500).json({msg:`Post not found`});
        }
        await Post.findByIdAndDelete(req.params.id);//or
        // await Post.delete();
        return res.status(200).json({msg:"Blog deleted successfully ! ! !"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:`Cannot delete this blog ${error.msg}`});
    }
}