import mongoose from 'mongoose'
const Connection = async (url) => {
    try {
        await mongoose.connect(url);
        console.log("Database connected successfully");
    } catch (error) {
        console.log(error);
        console.log("ERROR while connecting the database",error); 
        
    }
}

export default Connection;
