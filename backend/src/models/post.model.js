// src/models/posts.model

const mongoose = require("mongoose");

// Defining Posts mongoose schema
const postSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "users"},
    content: {
      type: String,
      trim: true,
      maxlength: 100,
      required: true,
    },
    media: [
      {
        url: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          // Media types supported
          enum: ["image", "video", "audio"],
          required: true,
        },
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: String,
        maxlength: 50,
      },
    ],
    media: [
      {
        url: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ["image", "video", "audio"],
          required: true,
        },
      },
    ],
    isLiked: {
      type: Boolean,
      default: false,
    },
    isBookmarked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Creating the model for post
const Post = mongoose.model("Posts", postSchema);

// Exporting the Post model
module.exports = Post;
