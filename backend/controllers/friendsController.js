const expressAsync = require("express-async-handler");
const User = require("../models/userModel");

const addfriends = expressAsync(async (req, res) => {
    const userLoggedInId = req.user._id; 
    const friendId = req.body.friendId; 
    try {
        const userLoggedIn = await User.findById(userLoggedInId);
        if (!userLoggedIn) {
            return res.status(404).json({ message: "User not found" });
        }
    
        const friendUser = await User.findById(friendId);
        if (!friendUser) {
            return res.status(404).json({ message: "Friend user not found" });
        }
        if (userLoggedIn.followings.includes(friendId)) {
            return res.status(400).json({ message: "Friend already added" });
        }

        userLoggedIn.followings.push(friendId);
        if (friendUser.followers.includes(userLoggedInId)) {
            return res.status(400).json({ message: "Friend is already followed by you" });
        }
        
        await userLoggedIn.save();

        res.status(200).json({ message: "Friend added successfully" });
    } catch (error) {
        console.error("Error adding friend:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = addfriends;
