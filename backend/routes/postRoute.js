const express = require("express");
const router = express.Router();
const passport = require("passport");
const handlepostrequest = require("../controllers/postcontroller");

router
  .route("/createpost")
  .post(passport.authenticate("jwt", { session: false }), handlepostrequest);

module.exports = router;
