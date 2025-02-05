// route: end points of apis

import express from 'express';
import {signupUser,loginUser} from '../controllers/user.controller.js'
import { uploadImage } from '../controllers/image.controller.js';
import { publishBlog,getAllBlogs } from '../controllers/blog.controller.js' 
import upload from '../middlewares/upload.middleware.js';
import {verifyJWT} from '../middlewares/auth.middleware.js'


const router = express.Router();

// routes
// router.post('/endpoint',controller)
router.post('/signup',signupUser);
router.post('/login',loginUser);
router.post('/file/upload',upload.single('file'),uploadImage);
router.post('/create',verifyJWT,publishBlog);
router.get('/all-posts',verifyJWT,getAllBlogs);


export default router;