// src/models/posts.model

const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema(
  {
    bookmarkedPost: { type: mongoose.Schema.Types.ObjectId, ref: "posts" },
  },
  { timestamps: true }
);

const Bookmark = mongoose.model("bookmarks", bookmarkSchema);

module.exports = Bookmark;
