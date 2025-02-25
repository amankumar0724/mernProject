import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type:String,
        required: true
    },
    username: {
        type: String,
        required:true
    },
    blogImage:{
        type: String,
        required:false,
    },
    category: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date
    }
});
const Post = mongoose.model('Post', PostSchema);
export default Post;