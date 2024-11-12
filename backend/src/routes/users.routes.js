const express = require("express");
const {
  getUsers,
  createUser,
  followUser,
  unfollowUser,
} = require("../controller/users.controller");
const router = express.Router();

// Defining user routes
router.get("/users", getUsers);
router.post("/users/user", createUser);
router.post("/users/follow/:follwedId", followUser);
router.post("/users/unfollow/:unfollwedId", unfollowUser);

module.exports = router;