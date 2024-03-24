const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const loggedinuserid=req.user._id
        console.log(loggedinuserid);

        const users = await User.find( {user: { $ne: loggedinuserid } });
        res.status(200).json(users);
    } catch (error) {
        console.error("Error while fetching users:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = getAllUsers;
