const expressAsync = require("express-async-handler");
const User = require("../models/userModel");

const searchUser = expressAsync(async (req, res) => {
  console.log(req.params);

  const { nameRegex } = req.params;

  if (!nameRegex) {
    throw new Error("Please provide username");
  }
  try {
    const users = await User.find({
      username: { $regex: new RegExp(nameRegex, "i") },
    });

    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found matching the criteria" });
    }
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error searching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = { searchUser };
