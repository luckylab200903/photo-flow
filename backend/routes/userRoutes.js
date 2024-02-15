const express=require("express");
const { loginhandle, signuphandle } = require("../controllers/userloginsignup");

const router=express.Router();

router.route("/login").post(loginhandle);
router.route("/signup").post(signuphandle);
module.exports=router;