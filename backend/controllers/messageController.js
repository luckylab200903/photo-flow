const expressAsyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const sendmessage = expressAsyncHandler(async (req, res) => {
  const { chatId, content } = req.body;
  //console.log(req.user);
  if (!content || !chatId) {
    console.log("invalid data passed into request");
    return res.sendStatus(400);
  }
  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };
  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name email",
    });
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });
    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const allMessages = expressAsyncHandler(async (req, res) => {
  try {
    const { messageId } = req.params;
    console.log(messageId);
    const messages = await Message.find({
      chat: messageId,
    })
      .populate("sender", "name email profilepicture username")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
const deleteMessage = expressAsyncHandler(async (req, res) => {
  try {
    const { messageId } = req.body;
    const message = Message.findById({ _id: messageId });
    if (message) {
      Message.deleteOne({ _id: messageId });
    }
    res.status(201).json({
      message: "Message deleted successfully",
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
const updateMessage = expressAsyncHandler(async (req, res) => {
  const { messageId, newMessage } = req.body;

  try {
    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    message.content = newMessage;
    await message.save();

    res.json({
      message: "Message updated successfully",
      updatedMessage: message,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = { updateMessage, sendmessage, allMessages, deleteMessage };
