const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  sendmessage,
  allMessages,
  deleteMessage,
  updateMessage
} = require("../controllers/messageController");

router
  .route("/sendmessage")
  .post(passport.authenticate("jwt", { session: false }), sendmessage);
router
  .route("/allmessages/:messageId")
  .get(passport.authenticate("jwt", { session: false }), allMessages);
router
  .route("/deletemessages/:messageId")
  .delete(passport.authenticate("jwt", { session: false }), deleteMessage);

  router
  .route("/updatemessages")
  .put(passport.authenticate("jwt", { session: false }), updateMessage);
module.exports = router;
