const express = require("express");
const jwtpassport = require("./connectDB/jwtpassport");
const userRoutes = require("./routes/userRoutes");
const commentRoute = require("./routes/commentRoute");
const statusRoute=require("./routes/statusRoute")
const connectToMongoDB = require("./connectDB/connect");
const searchRoute=require("./routes/searchRoute")
const app = express();
require("dotenv").config();
//require("./connectDB/googleOauth")
jwtpassport();
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", commentRoute);

app.use("/api", statusRoute);

app.use("/api",searchRoute)
const port = process.env.PORT || 5000;
try {
  app.listen(port, () => {
    console.log(`Server is listening on the port ${port}`);
    console.log(process.env.MONGO_URI);
    connectToMongoDB(process.env.MONGO_URI);
  });
} catch (error) {
  console.log(error);
}
