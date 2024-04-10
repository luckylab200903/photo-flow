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

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit("connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("room ka log hu mai", room);
    console.log(`User joined room ${room}`);
  });
  socket.on("new message", (newMessageRecieced) => {
    var chat = newMessageRecieced.chat;
    if (!chat.users) {
      return console.log("chat users not defined");
    }
    chat.users.forEach((user) => {
      if (user._id === newMessageRecieced.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieced);
    });
  });
});
