const expressAsync = require("express-async-handler");
const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

const commentAdd = expressAsync(async (req, res) => {
  const { comment, userId, postId } = req.body;
  if (!comment || !userId || !postId) {
    return res.status(400).json({
      message: "Please provide comment content, user ID, and post ID",
    });
  }

  try {
    const newComment = await Comment.create({
      text: comment,
      user: userId,
    });
    // Populate the 'user' field of the new comment
    await newComment.populate('user')

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            user: userId,
            text: comment,
            _id: newComment._id,
          },
        },
      }, 
      { new: true }
    ).populate('comments.user'); 

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Failed to add comment", error: error.message });
  }
});


const allComments = expressAsync(async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId)
      .populate({
        path: 'comments',
        populate: { path: 'user' } // Populate the 'user' field within the 'comments' array
      })
      .populate('user'); // Populate the 'user' field of the post itself
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post.comments);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve comments", error: error.message });
  }
});

module.exports = { commentAdd, allComments };
