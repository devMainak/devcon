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
const router = express.Router();

// Routes for posts
router.get("/", getPosts);
router.get("/:postId", getPostById);
router.post("/create", createPost);
router.post("/edit/:postId", updatePost);
router.post("/like/:postId", likePost);
router.post("/dislike/:postId", dislikePost);
router.delete("/delete/:postId", deletePost);

module.exports = router;