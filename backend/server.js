const express = require("express");
const { Server } = require("socket.io");
const jwtpassport = require("./connectDB/jwtpassport");
const userRoutes = require("./routes/userRoutes");
const commentRoute = require("./routes/commentRoute");
const statusRoute = require("./routes/statusRoute");
const connectToMongoDB = require("./connectDB/connect");
const searchRoute = require("./routes/searchRoute");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoute");
const likepostRoutes = require("./routes/likepostRoute");
const notificationRoutes = require("./routes/notificationRoutes");
const app = express();
const getallpost = require("./routes/getpostRoute");
const upload = require("./middleware/multer");
const postRoutes = require("./routes/postRoute");
const storyRoutes = require("./routes/storyRoutes");
const usergetroutes = require("./routes/usergetRoutes");
const addfriendRoutes = require("./routes/addfriendsRoute");
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
app.use("/api/all", getallpost);
app.use("/api", usergetroutes);
app.use("/api", addfriendRoutes);
app.use("/api", likepostRoutes);

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is listening on port ${server.address().port}`);
  console.log(process.env.MONGO_URI);
  connectToMongoDB(process.env.MONGO_URI);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
// Assuming you have functions to handle likes and comments
const handleLike = (postId, userId) => {
  // Logic to handle like
  // Emit Socket.io event
  io.emit('like', { postId, userId });
};

const handleComment = (postId, userId) => {
  // Logic to handle comment
  // Emit Socket.io event
  io.emit('comment', { postId, userId });
};

io.on("connection", (socket) => {
  //console.log(socket);
  //console.log("someone has connected");
  //io.emit("firstevent"," hello this is keshav kumar singh from socket io")
  socket.on("disconnect", () => {
    console.log("someone has disconnected");
  });
});

