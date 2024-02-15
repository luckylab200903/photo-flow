const express=require("express");
const { commentAdd, commentdelete, likecomment, updatecomment } = require("../controllers/comment");
const router=express.Router();

router.route("/addcomment").post(commentAdd);
router.route("/deletecomment").delete(commentdelete);
router.route("/likecomment").post(likecomment)
router.route("/updatecomment").post(updatecomment)

module.exports=router;