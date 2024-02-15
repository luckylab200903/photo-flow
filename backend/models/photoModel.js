const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
  caption: String,
  imageUrl: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Reference to the User model for users who liked the photo
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      }, // Reference to the User model
      text: String,
      date: { type: Date, default: Date.now },
    },
  ],
});

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;
