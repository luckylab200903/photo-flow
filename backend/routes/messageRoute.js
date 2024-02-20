const express = require("express");
const router = express.Router();
const passport = require("passport");

router.route("/message").post(passport.authenticate("jwt", { session: false }), accessChat);
router.route("/").get(passport.authenticate("jwt", { session: false }), fetchChat);