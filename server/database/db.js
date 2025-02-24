import mongoose from 'mongoose'
const Connection = async (url) => {
    // const URL = process.env.MONGODB_URI || `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.qg0ol.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    try {
        await mongoose.connect(url);
        console.log("Database connected successfully");
    } catch (error) {
        console.log(error);
        console.log("ERROR while connecting the database",error); 
        
    }
}

export default Connection;
