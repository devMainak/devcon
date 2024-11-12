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
router.get("/posts", getPosts);
router.get("/posts/:postId", getPostById);
router.post("/user/post", createPost);
router.post("/posts/edit/:postId", updatePost);
router.post("/posts/like/:postId", likePost);
router.post("/posts/dislike/:postId", dislikePost);
router.delete("/user/posts/:postId", deletePost);

module.exports = router;