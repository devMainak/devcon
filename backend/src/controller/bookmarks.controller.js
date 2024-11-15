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
const saveBookmark = async (postId) => {
  try {
    const postToSave = new Bookmark({
      bookmarkedPost: postId,
    });
    const bookmarkedPost = await postToSave.save();
    await bookmarkedPost.populate("bookmarkedPost");

    // Update the status of the post
    await Post.findByIdAndUpdate(postId, {
      isBookmarked: true,
    });
    return bookmarkedPost;
  } catch (error) {
    throw new Error(error);
  }
};

exports.addBookmark = async (req, res) => {
  const postId = req.params.postId;
  try {
    const bookmarkedPost = await saveBookmark(postId);
    if (bookmarkedPost) {
      res
        .status(201)
        .json({ message: "Post bookmarked.", bookmarkedPost: bookmarkedPost });
    } else {
      res.status(400).json({ message: "Failed to bookmark." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add bookmark" });
  }
};

// Function to remove post from bookmarks
const removeBookmark = async (postId) => {
  try {
    const unBookmarkedPost = await Bookmark.findByIdAndDelete(postId);
    const originalPostId = unBookmarkedPost.bookmarkedPost._id;
    await Post.findByIdAndUpdate(originalPostId, {
      isBookmarked: false,
    });
    return unBookmarkedPost;
  } catch (error) {
    throw new Error(error);
  }
};

exports.deleteBookmark = async (req, res) => {
  const postId = req.params.postId;
  try {
    const unBookmarkedPost = await removeBookmark(postId);
    if (unBookmarkedPost) {
      res.status(200).json({
        message: "Bookmarked removed successfully.",
        unBookmarkedPost: unBookmarkedPost,
      });
    } else {
      res.status(400).json({ message: "Failed remove bookmark." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to remove bookmark" });
  }
};
