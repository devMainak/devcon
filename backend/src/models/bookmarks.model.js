// src/models/posts.model

const mongoose = require("mongoose");

// Defining Posts mongoose schema
const bookmarkSchema = new mongoose.Schema(
  {
    bookmarkedPost: { type: mongoose.Schema.Types.ObjectId, ref: "posts" },
  },
  { timestamps: true }
);

// Creating the model for post
const Bookmark = mongoose.model("bookmarks", bookmarkSchema);

// Exporting the Post model
module.exports = Bookmark;
