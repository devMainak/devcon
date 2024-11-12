const express = require("express");
const {
  getBookmarks,
  addBookmark,
  deleteBookmark,
} = require("../controller/bookmarks.controller");
const router = express.Router();

// Defining bookmark routes
router.get("/", getBookmarks);
router.post("/:postId", addBookmark);
router.post("/delete/:postId", deleteBookmark);

module.exports = router;
