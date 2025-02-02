import User from "../models/user.model.js";
import bcrypt from 'bcrypt';

const signupUser = async (req,res) =>{//req stores all the requests made from the frontend, or any data entered in the frontend , all that comes in req
    try {
        // WHAT IS SALT?=> SALT IS A RANDOM STRING (APPENDED BEFORE THE HASHED PASSWORD) THAT IS USED TO HASH THE PASSWORD

        // Method 1 of hashing password
        // const salt = await bcrypt.genSalt();//we can give any value of salt size inside parenthesis , but default is 10
        // const hashedPassword = await bcrypt.hash(req.body.password,salt);
        
        // Method 2 of hashing password
        const hashedPassword = await bcrypt.hash(req.body.password,10);

        const user = {
            name: req.body.name,
            username:req.body.username,
            email: req.body.email,
            password: hashedPassword,
        }; 
        const newUser = new User(user);
        await newUser.save();
        return res.status(200).json({msg:"Sign up successfully !"})
    } catch (error) {
        return res.status(500).json({msg:`ERROR while sign up user: ${error}`})
    }

}
export {signupUser};