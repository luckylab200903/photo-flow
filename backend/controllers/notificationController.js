const asynchandler = require("express-async-handler");
const Notification = require("../models/notificationModel");
const handlepostnotification = asynchandler(async (req, res) => {
  const { message, userId } = req.body;
  const newNotificaton = await Notification.create({ user: userId, message });
  res.status(201).send({ Message: "notification sended succesfully" });
});

const getnotification = asynchandler(async (req, res) => {
  const userId = req.params.userId;
  const notifications = await Notification.find({ user: userId });
  res.status(200).json({ notifications });
});

module.exports = { handlepostnotification, getnotification };
