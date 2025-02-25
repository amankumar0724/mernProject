// entry point of my backend
import express, { Router } from 'express';
import dotenv from 'dotenv';
import Connection from './database/db.mjs'
import router from './routes/route.mjs';
import cors from 'cors';
import bodyParser from 'body-parser';//latest versions of express cannot handle "post" requests so we use body-parser

import path from 'path';


dotenv.config();

const app = express();
const _dirname = path.resolve();
const corsOptions = {
    origin: "https://thinksync-think-write-sync.onrender.com/",
    credentials: true,
}
app.use(cors(corsOptions));
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/',router);
// for DEPLOYMENT**************
// if(process.env.NODE_ENV == 'production') {
//     app.use(express.static("client/build"));
// }
app.use(express.static(path.join(_dirname,"client/build")));
app.get('*',(_,res) => {
    res.sendFile(path.resolve(_dirname,"client","build","index.html"));
})
// for DEPLOYMENT**************


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log("=======================================================================");
    console.log(`Server is running on port ${PORT}`);
    console.log("=======================================================================");
})
const url = process.env.MONGODB_URI;
Connection(url);