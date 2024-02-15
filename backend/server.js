const express = require("express");
const userRoutes=require("./routes/userRoutes")
const connectToMongoDB = require("./connectDB/connect");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use("/api",userRoutes)
try {
  app.listen(port, () => {
    console.log(`Server is listening on the port ${port}`);
    console.log(process.env.MONGO_URI);
    connectToMongoDB(process.env.MONGO_URI);
  });
} catch (error) {
  console.log(error);
}
