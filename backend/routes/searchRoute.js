const express = require("express");
const router = express.Router();
const { searchUser } = require("../controllers/search");

router.get("/search/:nameRegex", searchUser);

module.exports = router;
