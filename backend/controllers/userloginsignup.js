const expressAsync = require("express-async-handler");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const User = require("../models/userModel");
const expressAsyncHandler = require("express-async-handler");

const registerUser = expressAsync(async (req, res) => {
  const {
    email,
    description,
    profilePicture,
    gender,
    username,
    firstname,
    lastname,
    password,
  } = req.body;

  if (!email || !username || !firstname || !lastname || !password) {
    return res.status(400).json({ error: "Please fill in all the details" });
  }

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = await User.create({
    firstname: firstname,
    lastname: lastname,
    email: email,
    username: username,
    password: hashedPassword,
    //gender: gender,
    //description: description,
    //profilePicture: profilePicture,
  });

  const token = await generateToken(email, newUser);

  const userToReturn = { ...newUser.toJSON(), token };
  delete userToReturn.password;

  res.status(200).json(userToReturn);
});

const loginUser = expressAsync(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      msg: "Enter both the fields",
    });
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(401).json({
      message: "No user with this email",
    });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(403).json({
      msg: "Invalid credentials",
    });
  }

  const token = await generateToken(email, user);
  const userToReturn = { ...user.toJSON(), token };
  delete userToReturn.password;
  return res.status(200).json(userToReturn);
});

const handleprofilechange = expressAsyncHandler(async (req, res) => {
  try {
    const { profilePictureUrl } = req.body;
    req.user.profilepicture = profilePictureUrl;
    console.log(profilePictureUrl);
    await req.user.save();
    res.status(200).send({ message: "Profile picture updated successfully" });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).send({ error: "Failed to update profile picture" });
  }
});
const getuserprofile=expressAsyncHandler(async(req,res)=>{
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = { registerUser, loginUser ,handleprofilechange,getuserprofile};
