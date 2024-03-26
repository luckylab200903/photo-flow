const expressAsyncHandler = require("express-async-handler");
const Post = require("../models/postModel");

const addpostlike = expressAsyncHandler(async (req, res) => {
  try {
    const { postId, userId } = req.body;

    const post = await Post.findById(postId);

    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      await post.save();
    }

    return res
      .status(400)
      .json({ success: false, message: "User already liked this post" });

    res.status(200).json({ success: true, message: "Like added successfully" });
  } catch (error) {
    console.error("Error adding like:", error);
    res.status(500).json({ success: false, message: "Failed to add like" });
  }
});

const addpostdislike = expressAsyncHandler(async (req, res) => {
  try {
    const { postId, userId } = req.body;
    const post = await Post.findById(postId);
    if (!post.dislikes.includes(userId)) {
      post.dislikes.push(userId);
      await post.save();
    }
    return res
      .status(400)
      .json({ success: false, message: "User already disliked this post" });

    res
      .status(200)
      .json({ success: true, message: "Dislike added successfully" });
  } catch (error) {
    console.error("Error adding dislike:", error);
    res.status(500).json({ success: false, message: "Failed to add dislike" });
  }
});

module.exports = { addpostdislike, addpostlike };
