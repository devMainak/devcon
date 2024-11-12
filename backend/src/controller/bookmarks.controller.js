const Bookmark = require("../models/bookmarks.model");

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
const saveBookmark = async (postId, post) => {
  try {
    await Post.findByIdAndUpdate(postId, { ...post, isBookmarked: true });
    const postToSave = new Bookmark({
      ...post,
      isBookmarked: true,
      postId: postId,
    });
    const bookmarkedPost = postToSave.save();
    return bookmarkedPost;
  } catch (error) {
    throw new Error(error);
  }
};

exports.addBookmark = async (req, res) => {
  const postId = req.params.postId;
  const post = req.body;
  try {
    const bookmarkedPost = await saveBookmark(postId, post);
    if (bookmarkedPost) {
      res
        .status(201)
        .json({ message: "Post bookmarked.", bookmarkedPost: bookmarkedPost });
    } else {
      res.status(400).json({ message: "Failed to bookmark." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Failed to add bookmark");
  }
};

// Function to remove post from bookmarks
const removeBookmark = async (postId) => {
  try {
    const unBookmarkedPost = await Bookmark.findByIdAndDelete(postId);
    await Post.findByIdAndUpdate(postId, {
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
