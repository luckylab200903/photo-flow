const express = require("express");
const router = express.Router();
const passport = require("passport");
const { getallpost } = require("../controllers/getallpostfromdb");
router.route("/getallposts").get(passport.authenticate("jwt", { session: false }),getallpost);

module.exports = router;
