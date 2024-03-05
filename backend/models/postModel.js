const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  images: [
    {
      filename: String,
      url: String,
      size: Number,
    },
  ],
  caption: {
    type: String,
    maxlength: 200, 
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      text: String,
      date: { type: Date, default: Date.now },
    },
  ],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
