const express = require("express");
const jwtpassport = require("./connectDB/jwtpassport");
const userRoutes = require("./routes/userRoutes");
const commentRoute = require("./routes/commentRoute");
const statusRoute = require("./routes/statusRoute");
const connectToMongoDB = require("./connectDB/connect");
const searchRoute = require("./routes/searchRoute");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoute");
const cloudRoutes = require("./routes/cloudRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const app = express();
const upload = require("./middleware/multer");
const postRoutes = require("./routes/postRoute");
const storyRoutes = require("./routes/storyRoutes");
const fs = require("fs");
const multer = require("multer");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));
app.use(cors());
jwtpassport();
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", commentRoute);
app.use("/api", statusRoute);
app.use("/api", searchRoute);
app.use("/api", chatRoutes);
app.use("/api", messageRoutes);
app.use("/api", postRoutes);
app.use("/api", storyRoutes);
app.use("/api", notificationRoutes);

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
