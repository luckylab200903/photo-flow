const expressAsync = require("express-async-handler");
const userModel = require("../models/userModel");

const searchUser = expressAsync(async (req, res) => {
  const { nameRegex } = req.query;
  try {
    const regexPattern = new RegExp(`^${nameRegex}`, "i");

    const users = await userModel.find({ username: regexPattern });

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
