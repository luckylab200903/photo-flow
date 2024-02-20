const expressAsync = require("express-async-handler");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const User = require("../models/userModel");

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

  if (
    !email ||
    !username ||
    !firstname ||
    !lastname ||
    !password 
  ) {
    res.status(400).json({ error: "Please fill in all the details" });
    return;
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    res.status(400).json({ error: "User already exists" });
    return;
  }

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
    res.sendStatus(400).json({
      msg: "enter both the fields",
    });
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    res.sendStatus(401).json({
      message: "no user with this email",
    });
  }

  const ispasswordvalid = bcrypt.compareSync(password, user.password);
  if (!ispasswordvalid) {
    res.sendStatus(403).json({
      msg: "invalid credentials",
    });
  }
  const token = await generateToken(email, user);
  const userToReturn = { ...user.toJSON(), token };
  delete userToReturn.password;
  res.status(200).json(userToReturn);
});

module.exports = { registerUser, loginUser };
