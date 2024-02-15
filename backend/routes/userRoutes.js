const express=require("express");
const { loginhandle, signuphandle, loginUser, registerUser } = require("../controllers/userloginsignup");

const router=express.Router();

router.route("/login").post(loginUser);
router.route("/signup").post(registerUser);
module.exports=router;