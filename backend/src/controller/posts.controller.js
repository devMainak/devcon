const Post = require("../models/post.model");

// read all the posts from DB logic
const readAllPosts = async () => {
  try {
    const posts = await Post.find().populate("author");
    return posts;
  } catch (error) {
    throw error;
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await readAllPosts();
    if (posts) {
      res.status(200).json({ message: "Posts fetched successfully.", posts });
    } else {
      res.status(404).json({ message: "No posts found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch posts." });
  }
};

// Function to read post by Id
const readPostById = async (postId) => {
  try {
    const postById = await Post.findById(postId).populate("author");
    return postById;
  } catch (error) {
    throw error;
  }
};

exports.getPostById = async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await readPostById(postId);
    if (post) {
      res.status(200).json({ post: post });
    } else {
      res.status(404).json({ message: "No such post found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load post." });
  }
};

// Function create new post in DB
const savePost = async (post) => {
  try {
    const postToSave = new Post(post);
    const savedPost = await postToSave.save();
    return await Post.findById(savedPost._id).populate("author");
  } catch (error) {
    throw error;
  }
};

exports.createPost = async (req, res) => {
  const post = req.body;
  try {
    const savedPost = await savePost(post);
    if (savedPost) {
      res
        .status(201)
        .json({ message: "Post created successfully.", savedPost: savedPost });
    } else {
      res.status(400).json({ message: "Failed to add post." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add post." });
  }
};

// Function to update post by Id from db
const updatePostById = async (postId, post) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(postId, post, {
      new: true,
    }).populate("author");
    return updatedPost;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.updatePost = async (req, res) => {
  const postId = req.params.postId;
  const post = req.body;

  try {
    const updatedPost = await updatePostById(postId, post);
    if (updatedPost) {
      res.status(200).json({
        message: "Updated post successfully.",
        updatedPost: updatedPost,
      });
    } else {
      res.status(400).json({ message: "Failed to update post." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update post." });
  }
};

// Function to like a post
const likeAPost = async (postId, likedUserId) => {
  try {
    const likedPost = await Post.findById(postId);
    const updatedPostData = [...likedPost.likes, likedUserId];
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        likes: updatedPostData,
      },
      { new: true }
    ).populate("author");
    return updatedPost;
  } catch (error) {
    throw error;
  }
};

exports.likePost = async (req, res) => {
  const postId = req.params.postId;
  const { likedUserId } = req.body;
  try {
    const likedPost = await likeAPost(postId, likedUserId);
    if (likedPost) {
      res.status(200).json({ message: "Liked post.", likedPost: likedPost });
    } else {
      res.status(400).json({ message: "Failed to like post." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to like the post." });
  }
};

// Function to dislike a post
const dislikeAPost = async (postId, dislikedUserId) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: dislikedUserId } },
      { new: true }
    ).populate("author");

    return updatedPost;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.dislikePost = async (req, res) => {
  const postId = req.params.postId;
  const { dislikedUserId } = req.body;
  try {
    const dislikedPost = await dislikeAPost(postId, dislikedUserId);
    if (dislikedPost) {
      res
        .status(200)
        .json({ message: "disliked post.", dislikedPost: dislikedPost });
    } else {
      res.status(400).json({ message: "Failed to dislike post." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to like the post." });
  }
};

// Function to delete post by Id from DB
const deletePostById = async (postId) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    return deletedPost;
  } catch (error) {
    throw error;
  }
};

exports.deletePost = async (req, res) => {
  const postId = req.params.postId;
  try {
    const deletedPost = await deletePostById(postId);
    if (deletedPost) {
      res.status(200).json({
        message: "Post deleted successfully.",
        deletedPost: deletedPost,
      });
    } else {
      res.status(400).json({ error: "Failed to delete post." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete post." });
  }
};
