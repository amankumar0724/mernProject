// route: end points of apis

import express from 'express';
import {signupUser} from '../controllers/user.controllerjs'

const router = express.Router();

// routes
// router.post('/endpoint',controller)
router.post('/signup',signupUser);


export default router;