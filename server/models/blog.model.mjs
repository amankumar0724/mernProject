import mongoose from "mongoose";

const BlogSchema = mongoose.Schema({
    title: String,
    content: String,
    author: String,
    imageUrl:String,
})
const Blog = mongoose.model('Blog', BlogSchema);
export default Blog;