// entry point of my backend
import express, { Router } from 'express';
import dotenv from 'dotenv';
import Connection from './database/db.js'
import router from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';//latest versions of express cannot handle "post" requests so we use body-parser


dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/',router);
// for DEPLOYMENT
if(process.env.NODE_ENV == 'production') {
    app.use(express.static("client/build"));
}
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log("=======================================================================");
    console.log(`Server is running on port ${PORT}`);
    console.log("=======================================================================");
})
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const url = process.env.MONGODB_URI || `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.qg0ol.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
Connection(url);