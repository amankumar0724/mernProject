// route: end points of apis

import express from 'express';
import {signupUser,loginUser} from '../controllers/user.controller.mjs'
import { uploadImage } from '../controllers/image.controller.mjs';
import { publishBlog,getAllBlogs,getBlogById,updateBlog,deleteBlog } from '../controllers/blog.controller.mjs' 
import upload from '../middlewares/upload.middleware.mjs';
import {verifyJWT} from '../middlewares/auth.middleware.mjs'
import { addNewComment, deleteComment, getAllComments } from '../controllers/comment.controller.mjs';


const router = express.Router();

// routes
// router.post('/endpoint',controller)
router.post('/signup',signupUser);
router.post('/login',loginUser);
router.post('/file/upload',upload.single('file'),uploadImage);
router.post('/create',verifyJWT,publishBlog);
router.get('/all-posts',verifyJWT,getAllBlogs);
router.get('/show-blog/:id',verifyJWT,getBlogById);
router.put('/update-post/:id',verifyJWT,updateBlog);
router.delete('/delete-post/:id',verifyJWT,deleteBlog);
router.post('/new-comment',verifyJWT,addNewComment);
router.get('/all-comments/:id',verifyJWT,getAllComments);
router.delete('/delete-comment/:id',verifyJWT,deleteComment);


export default router;