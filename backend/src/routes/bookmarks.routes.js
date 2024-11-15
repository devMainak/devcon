const express = require("express");
const {
  getBookmarks,
  addBookmark,
  deleteBookmark,
} = require("../controller/bookmarks.controller");
const authenticate = require("../middlewares/auth.middleware");
const router = express.Router();

// Defining bookmark routes
router.get("/", authenticate, getBookmarks);
router.post("/create/:postId", authenticate, addBookmark);
router.delete("/delete/:postId", authenticate, deleteBookmark);

module.exports = router;
