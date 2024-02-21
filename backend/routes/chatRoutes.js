const express = require("express");

const passport = require("passport");
const { makeChat, fetchChat } = require("../controllers/chatController");
const router = express.Router();


router.route("/chatcreate").post(passport.authenticate("jwt", { session: false }), makeChat);
router.route("/getchat").get(passport.authenticate("jwt", { session: false }), fetchChat);

module.exports=router