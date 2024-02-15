const express=require("express")

const connectToMongoDB = require("./connectDB/connect");
const app=express();
require('dotenv').config()
const port=process.env.PORT || 5000;


app.listen(port,()=>{
    connectToMongoDB()
    console.log(`Listening on the port ${port}`);
})