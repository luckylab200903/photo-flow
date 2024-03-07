const express = require("express");
const { loginUser, registerUser, handleprofilechange, getuserprofile } = require("../controllers/userloginsignup");
const passport = require("passport");

const router = express.Router();

router.route("/login").post(loginUser);
router.route("/signup").post(registerUser);
router.route('/updateprofilepicture').put(passport.authenticate("jwt",{session:false}), handleprofilechange); 
router.get('/user/:id', passport.authenticate("jwt", { session: false }), getuserprofile); 
module.exports = router;
