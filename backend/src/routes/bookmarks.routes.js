const express = require("express");
const {
  getBookmarks,
  addBookmark,
  deleteBookmark,
} = require("../controller/bookmarks.controller");
const router = express.Router();

// Defining bookmark routes
router.get("/users/bookmark", getBookmarks);
router.post("/users/bookmark/:postId", addBookmark);
router.post("/users/remove-bookmark/:postId", deleteBookmark);

module.exports = router;