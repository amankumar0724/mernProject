import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';//file system = fs=>file handling
import Blog from '../models/blog.model.js';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});
export const uploadImage = async (req,res) => {
    // const imageLocalPath = req.files?.blogImage[0].path;
    // console.log(imageLocalPath);
    // if(!imageLocalPath) {
    //     return res.
    // }
    // if(!request.file) 
    //     return response.status(404).json("File not found");
    // const imageUrl = `${url}/file/${request.file.filename}`;
    // response.status(200).json(imageUrl);  
    try {
        // Upload to Cloudinary
        // console.log(req);
        const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
            folder: 'blog_images'
        });
        // Delete from local storage
        fs.unlinkSync(req.file.path);
        // Store in MongoDB
        const newBlog = new Blog({ imageUrl: cloudinaryResponse.secure_url });
        await newBlog.save();
        res.json({ url: cloudinaryResponse.secure_url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Image upload failed' });
    }  
}
