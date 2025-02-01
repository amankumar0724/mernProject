import User from "../models/user.model.js";

const signupUser = async (req,res) =>{//req stores all the requests made from the frontend, or any data entered in the frontend , all that comes in req
    try {
        const user = req.body; 
        const newUser = new User(user);
        const savedUser = await newUser.save();
        return res.status(200).json({msg:"Sign up successfully !"})
    } catch (error) {
        return res.status(500).json({msg:`ERROR while sign up user: ${error}`})
    }

}
export default signupUser;