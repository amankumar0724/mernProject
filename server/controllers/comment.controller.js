import Comment from "../models/comment.model.js"
export const addNewComment = async (req,res) => {
    try {
        const comment = await new Comment(req.body);
        comment.save();

        return res.status(200).json('Comment saved successfully');
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }
}
export const getAllComments = async (req,res) => {
    
    try {
        const comments = await Comment.find({ postId: req.params.id });
        if(!comments) {
            return res.status(500).json("Comments cannot be fetched")
        }
        return res.status(200).json(comments);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:`Cannot fetch all comments`})
    }
}
export const deleteComment = async (req,res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        return res.status(200).json('comment deleted successfully');
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}