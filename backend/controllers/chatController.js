const expressAsyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel.js");
const User = require("../models/userModel.js");

const makeChat = expressAsyncHandler(async (req, res) => {
  const { userId } = req.body;
  console.log("logged in user", req.user._id);
  console.log("opposite user", userId);
  if (!userId) {
    console.log("userID is not present with the request");
    return res
      .status(400)
      .send({ message: "userID is not present with the request" });
  }

  try {
    const isChat = await Chat.findOne({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage.sender", "name email");
    // console.log(users);
    if (isChat) {
      res.status(200).send(isChat);
    } else {
      const chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };

      const createdChat = await Chat.create(chatData);

      const fullChat = await Chat.findOne({ _id: createdChat._id })
        .populate("users", "-password")
        .populate("latestMessage.sender", "name email");

      // res.status(200).send(fullChat);
      res.status(200).send(createdChat);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const fetchChat = expressAsyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latesMessage.sender",
          select: "name email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { makeChat, fetchChat };
