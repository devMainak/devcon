const express = require("express");
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
} = require("../controller/posts.controller");
const authenticate = require("../middlewares/auth.middleware");
const router = express.Router();

// Routes for posts
router.get("/", authenticate, getPosts);
router.get("/:postId", authenticate, getPostById);
router.post("/create", authenticate, createPost);
router.post("/edit/:postId", authenticate, updatePost);
router.post("/like/:postId", authenticate, likePost);
router.post("/dislike/:postId", authenticate, dislikePost);
router.delete("/delete/:postId", authenticate, deletePost);

module.exports = router;
