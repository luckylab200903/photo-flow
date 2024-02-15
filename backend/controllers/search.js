const expressAsync = require("express-async-handler");
const userModel = require("../models/userModel");

const searchUser = expressAsync(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error searching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = { searchUser };
