const express = require("express");
const { commentAdd, allComments, } = require("../controllers/comment");
const router = express.Router();
const passport = require("passport");
router
  .route("/addcomment")
  .post(passport.authenticate("jwt", { session: false }), commentAdd);
router.route("/comment/:postId").get(passport.authenticate("jwt", { session: false }),allComments);

module.exports = router;
