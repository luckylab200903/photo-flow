const expressAsync = require("express-async-handler");
const Comment = require("../models/commentModel");
const { findById } = require("../models/userModel");

const commentAdd = expressAsync(async (req, res) => {
  const { comment } = req.body;
  if (!comment) {
    return res.status(402).json({
      message: "Please add comment",
    });
  }
  try {
    const newComment = await Comment.create({
      text: comment,
      user: req.user._id,
    });
    res.status(201).json(newComment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add comment", error: error.message });
  }
});

const commentdelete = expressAsync(async (req, res) => {
  const { id } = req.body;
  try {
    // Find the comment by id and delete it
    const comment = await Comment.findByIdAndDelete(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({ message: "Comment deleted successfully", comment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete comment", error: error.message });
  }
});

const updatecomment = expressAsync(async (req, res) => {
  const { id, newComment } = req.body;
  try {
    if (!comment) {
      return res.status(404).json({
        message: "comment not found",
      });
    }
    res.status(200).json({ message: "Comment updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "error in updating the comment" });
  }
  const comment = await findByIdAndUpdate(
    id,
    { text: newComment },
    { new: true }
  );
});

const likecomment = expressAsync(async (req, res) => {
  const { id } = req.body;
  try {
    const comment = await findById(id);
    if (!comment) {
      return res.status(405).json({ message: "comment not found" });
    }
    Comment.likes.push(req.user._id);
    await Comment.save();
    res.status(200).json({ message: "Comment liked successfully", comment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to like comment", error: error.message });
  }
});

module.exports={commentAdd,commentdelete,updatecomment,likecomment}
