const express = require("express");
const router = express.Router();
const passport = require("passport");
const handlepostrequest = require("../controllers/postcontroller");

router.route("/createpost").post(handlepostrequest);

module.exports = router;
