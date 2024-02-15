const express = require("express");
const {
  commentAdd,
  commentdelete,
  likecomment,
  updatecomment,
} = require("../controllers/comment");
const router = express.Router();
const passport = require("passport");
router
  .route("/addcomment")
  .post(passport.authenticate("jwt", { session: false }), commentAdd);
router
  .route("/deletecomment")
  .delete(passport.authenticate("jwt", { session: false }), commentdelete);
router
  .route("/likecomment")
  .post(passport.authenticate("jwt", { session: false }), likecomment);
router
  .route("/updatecomment")
  .patch(passport.authenticate("jwt", { session: false }), updatecomment);

module.exports = router;
