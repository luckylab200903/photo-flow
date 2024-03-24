const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 15,
      unique: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      min: 4,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
    profilepicture: {
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTnrCvOI5sRE1GITYUbD8oGc7mNG-WTYTcFQ&usqp=CAU",
      type: String,
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
  }
  // description: {
  //   type: String,
  //   max: 50,
  //   default: "",
  // },
  // profilePicture: {
  //   type: String,
  //   default: "https://media.tenor.com/WWBL18qey9IAAAAM/hello.gif",
  // },

  // gender: {
  //   type: String,
  //   enum: ["male", "female"],
  // },
  // jwtToken: {
  //   type: String,
  // },
);

module.exports = mongoose.model("User", UserSchema);
