const mongoose = require("mongoose");

// Defining user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userImageUrl: {
    type: String,
    default:
      "https://media.istockphoto.com/id/1288129985/vector/missing-image-of-a-person-placeholder.jpg?s=612x612&w=0&k=20&c=9kE777krx5mrFHsxx02v60ideRWvIgI1RWzR1X4MG2Y=",
  },
  profileBio: {
    type: String,
    maxlength: 100,
  },
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
});

// Creating the model
const User = mongoose.model("users", userSchema);

// Exporting the model
module.exports = User;
