const express = require("express");
const getAllUsers = require("../controllers/friendSuggestController");
const passport = require("passport");
const router = express.Router();

router.route("/getusersuggestions").get(passport.authenticate("jwt", { session: false }), getAllUsers);

module.exports = router;
