const express = require("express");
const {
  getUsers,
  createUser,
  followUser,
  unfollowUser,
  updateUser,
} = require("../controller/users.controller");
const authenticate = require("../middlewares/auth.middleware");
const router = express.Router();

// Defining user routes
router.get("/", authenticate, getUsers);
router.post("/create", authenticate, createUser);
router.post("/follow/:followedId", authenticate, followUser);
router.post("/unfollow/:unfollowedId", authenticate, unfollowUser);
router.post("/update/:userId", authenticate, updateUser);

module.exports = router;
