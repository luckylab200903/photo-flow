const mongoose = require("mongoose");
const User = require("./userModel");
const notificationSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
