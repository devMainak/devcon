const express = require("express");
const {
  getUsers,
  createUser,
  followUser,
  unfollowUser,
} = require("../controller/users.controller");
const router = express.Router();

// Defining user routes
router.get("/", getUsers);
router.post("/create", createUser);
router.post("/follow/:followedId", followUser);
router.post("/unfollow/:unfollowedId", unfollowUser);

module.exports = router;