const mongoose = require("mongoose");
const User=require("./userModel")
const Message=require("./messageModel")
const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat:{type:Boolean ,default:false},
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;
