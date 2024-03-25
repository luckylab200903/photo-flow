const express = require("express");
const passport = require("passport");
const {
  addpostdislike,
  addpostlike,
} = require("../controllers/likepostController");
const router = express.Router();

router
  .route("/addlikepost")
  .post(passport.authenticate("jwt", { session: false }), addpostlike);
router
  .route("/addpostdislike")
  .post(passport.authenticate("jwt", { session: false }), addpostdislike);
module.exports = router;
