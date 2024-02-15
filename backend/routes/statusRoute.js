const express = require("express");
const router = express.Router();
const passport = require("passport");
const { addstatus, deletestatus, updatestatus, likestatus } = require("../controllers/statuscon");
router.route("/addStatus").post(passport.authenticate("jwt", { session: false }),addstatus)
router.route("/deletestatus").delete(passport.authenticate("jwt", { session: false }),deletestatus)
router.route("/updatestatus").patch(passport.authenticate("jwt", { session: false }),updatestatus)
router.route("/likestatus").post(passport.authenticate("jwt", { session: false }),likestatus)

module.exports=router