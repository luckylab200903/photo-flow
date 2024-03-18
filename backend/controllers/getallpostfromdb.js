const Post = require("../models/postModel");
const asynchandler = require("express-async-handler");
const User=require("../models/userModel")
const getallpost = asynchandler(async (req, res) => {
  try {
    const posts = await Post.find().populate("user");
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in fetching posts", error: error.message });
  }
});

module.exports = { getallpost };
