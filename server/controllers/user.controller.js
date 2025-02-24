import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from "../models/token.model.js";


dotenv.config();
// Helper function to validate the plain text password
const isValidPassword = (password) => {
    // Must have at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long.
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
};

export const signupUser = async (req, res) => {//req stores all the requests made from the frontend, or any data entered in the frontend , all that comes in req
    
    try {
        console.log(req.body);
        // Validate the plain text password first
        if (!isValidPassword(req.body.password)) {
            return res.status(400).json({
                msg: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
            });
        }


        // WHAT IS SALT?=> SALT IS A RANDOM STRING (APPENDED BEFORE THE HASHED PASSWORD) THAT IS USED TO HASH THE PASSWORD

        // Method 1 of hashing password
        // const salt = await bcrypt.genSalt();//we can give any value of salt size inside parenthesis , but default is 10
        // const hashedPassword = await bcrypt.hash(req.body.password,salt);
        
        // Method 2 of hashing password
        
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        };

        // Find by username
        let existingUser = await User.findOne({ username: req.body.username });
        if(existingUser) {
            return res.status(400).json({ error: "This username already exists" });
        }
        
        // Find by email
        existingUser = await User.findOne({ email: req.body.email });
        if(existingUser) {
            return res.status(400).json({ error: "This email already exists" });
        }
        // Validate email format before saving
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(user.email)) {
            return res.status(501).json({message: "Please enter a valid credentials." });
        }
        
        const newUser = new User(user);
        await newUser.save();
        res.status(200).json({ msg: "Sign up successfully!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: `ERROR while sign up user: ${error}` });
    }
}

export const loginUser = async (req,res) => {
    // console.log("************");
    // console.log(req.body);//{ usernameOrEmail: 'a', password: 'Qwerty@123' }
    let user = await User.findOne({username: req.body.usernameOrEmail})
    if(!user) {
        user = await User.findOne({email: req.body.usernameOrEmail});    
    }
    if(!user) {
        return res.status(400).json({msg:'Username or email does not exists.'})    
    }
    
    try {
        const match = await bcrypt.compare(req.body.password, user.password);
        if(match) {
            const accessToken = jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY,{expiresIn:'15m'});
            const refreshToken = jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY);
            const newToken = new Token({token:refreshToken});
            // console.log(refreshToken);
            await newToken.save();
            return res.status(200).json({accessToken,refreshToken,name:user.name,username:user.username,email:user.email});
        } else {
            return res.status(400).json({msg:"Wrong password."});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:`Error while logging in the user.${error}`});
    }
}