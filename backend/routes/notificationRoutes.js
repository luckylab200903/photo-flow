const express = require("express");
const passport = require("passport");
const {
  handlepostnotification,
  getnotification,
} = require("../controllers/notificationController");
const router = express.Router();
router
  .route("/postnotification")
  .post(
    passport.authenticate("jwt", { session: false }, handlepostnotification)
  );
router
  .route("/getnotification")
  .post(passport.authenticate("jwt", { session: false }, getnotification));
module.exports = router;
