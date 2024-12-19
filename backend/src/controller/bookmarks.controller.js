const Bookmark = require("../models/bookmarks.model");
const Post = require("../models/post.model");

// Function to get all bookmarks from db
const readAllBookmarks = async () => {
  try {
    const bookmarks = await Bookmark.find();
    return bookmarks;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getBookmarks = async (req, res) => {
  try {
    const bookmarks = await readAllBookmarks();
    console.log("bookmarks:", bookmarks);
    if (bookmarks) {
      res.status(200).json({
        message: "Bookmarks fetched successfully.",
        bookmarks: bookmarks,
      });
    } else {
      res.status(400).json({ message: "Failed to fetch bookmarks" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch bookmarks." });
  }
};

// Function to add post bookmarks
const saveBookmark = async (postId, userId) => {
  try {
    const bookmarkedPost = await Post.findByIdAndUpdate(
      postId,
      { $addToSet: { bookmarks: userId } },
      { new: true }
    ).populate("author");

    return bookmarkedPost;
  } catch (error) {
    throw new Error(error);
  }
};

exports.addBookmark = async (req, res) => {
  const postId = req.params.postId;
  const { userId } = req.body;
  try {
    const bookmarkedPost = await saveBookmark(postId, userId);
    if (bookmarkedPost) {
      res
        .status(201)
        .json({ message: "Post bookmarked.", bookmarkedPost: bookmarkedPost });
    } else {
      res.status(400).json({ message: "Failed to add bookmark." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add bookmark" });
  }
};

// Function to remove post from bookmarks
const removeBookmark = async (postId, userId) => {
  console.log(postId, userId);
  try {
    const unbookmarkedPost = await Post.findByIdAndUpdate(
      postId,
      { $pull: { bookmarks: userId } },
      { new: true }
    ).populate("author");
    console.log(unbookmarkedPost);
    return unbookmarkedPost;
  } catch (error) {
    throw new Error(error);
  }
};

exports.deleteBookmark = async (req, res) => {
  const postId = req.params.postId;
  const { userId } = req.body;
  try {
    const unBookmarkedPost = await removeBookmark(postId, userId);
    if (unBookmarkedPost) {
      res.status(200).json({
        message: "Bookmarked removed successfully.",
        unBookmarkedPost: unBookmarkedPost,
      });
    } else {
      res.status(400).json({ message: "Failed to remove bookmark." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to remove bookmark" });
  }
};
