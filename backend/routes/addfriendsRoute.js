const express = require("express");

const passport = require("passport");
const addfriends = require("../controllers/friendsController");
const router = express.Router();

router.route("/addfriends").post(passport.authenticate("jwt", { session: false }),addfriends)
module.exports=router