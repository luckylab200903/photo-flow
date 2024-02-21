const express = require("express");
const { searchUser } = require("../controllers/search");
const router = express.Router();

router.route("/search").get(searchUser)

module.exports=router