const Post = require("../models/postModel");

const handlepostrequest = async (req, res) => {
  try {
    const { caption, imageurls } = req.body;

    if (!caption || !imageurls) {
      return res
        .status(400)
        .json({ message: "Caption or image URLs are missing." });
    }
    const newPost = new Post({
      images: imageurls.map((url) => ({ url })),
      caption,
    });
    await newPost.save();

    res
      .status(201)
      .json({ message: "Post created successfully.", post: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = handlepostrequest;
