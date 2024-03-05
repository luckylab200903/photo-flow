const mongoose = require("mongoose");
const Post = require("./postModel");
const User = require("./userModel");
const photoSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  uploadDate: { type: Date, default: Date.now },
});

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;
