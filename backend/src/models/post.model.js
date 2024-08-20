// src/models/posts.model

const mongoose = require('mongoose')

// Defining Posts mongoose schema
const postSchema = new mongoose.Schema({
    author: {
        name: {
            type: String,
            default: "Elliot Alderson"
        },
        userImageUrl: {
            type: String,
            default: "https://media.istockphoto.com/id/1288129985/vector/missing-image-of-a-person-placeholder.jpg?s=612x612&w=0&k=20&c=9kE777krx5mrFHsxx02v60ideRWvIgI1RWzR1X4MG2Y="
        }
    },
    content: {
        type: String,
        trim: true,
        maxlength: 100
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [
        {
            type: String,
            maxlength: 50
        }
    ],
    media: [
        {
            type: String,
        }
    ]
}, { timestamps: true })

// Creating the model for post
const Post = mongoose.model('Post', postSchema)

// Exporting the Post model
module.exports = Post
