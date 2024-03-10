const express=require("express");

const { storyupload, storydelete, getstories } = require("../controllers/storyController");
const passport = require("passport");
const router=express.Router();

router.route("/uploadstory").post(passport.authenticate("jwt", { session: false }),storyupload);
router.route("/deletestory/:storyId").delete(passport.authenticate("jwt", { session: false }), storydelete);
router.route("/getallstories").get(passport.authenticate("jwt", { session: false }), getstories)
module.exports=router;
