const jwt = require("jsonwebtoken");

const generateToken = async (email,user) => {
  var token = await jwt.sign({ identifier:user._id }, process.env.SECRET)

  return token;
}

module.exports = generateToken;

