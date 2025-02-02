// route: end points of apis

import express from 'express';
import {signupUser,loginUser} from '../controllers/user.controller.js'

const router = express.Router();

// routes
// router.post('/endpoint',controller)
router.post('/signup',signupUser);
router.post('/login',loginUser);

export default router;