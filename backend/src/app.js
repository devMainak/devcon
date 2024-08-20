// src/app.js

const express = require('express')
const cors = require('cors')
// Data models
const Post = require('./models/post.model')

// Function to initialize database connection
const initializeDatabase = require('./config/db.connection')

const app = express()

// cors config
const corsOptions = {
    origin: "*",
    credentials: true
  }

// Initialize database
initializeDatabase()

// Apply middleware
app.use(cors(corsOptions)) // Enable CORS for all routes
app.use(express.json()) // Parse incoming JSON Requests


// Defining Routes

// Function to read all the posts from DB
const readAllPosts = async () => {
    try {
        const posts = await Post.find()
        return posts
    } catch (error) {
        throw error
    }
}

// GET method on '/posts' route to fetch posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await readAllPosts()
        if (posts)
        {
            res.status(200)
            .json(posts)
        } else {
            res.status(404)
            .json({message: "No posts found."})
        }
    } catch (error) {
        console.error(error)
        res.status(500)
        .json({error: "Failed to fetch posts."})
    }
})

// Function to read post by Id
const readPostById = async (postId) => {
    try {
        const postById = await Post.findById(postId)
        return postById
    } catch (error) {
        throw error
    }
}

// GET method on '/posts/:postId' route
app.get('/posts/:postId', async (req, res) => {
    const postId = req.params.postId
    try {
        const post = await readPostById(postId)
        if (post) {
            res.status(200)
            .json({post: post})
        } else {
            res.status(404)
            .json({message: "No such post found."})
        }
    } catch (error) {
        console.error(error)
        res.status(500)
        .json({error: "Failed to load post."})
    }
})

// Function create new post in DB
const savePost = async (post) => {
    try {
        const postToSave = new Post(post)
        const savedPost = await postToSave.save()
        return savedPost
    } catch (error) {
        throw error
    }
}

// POST method on '/' to save post
app.post('/user/post', async (req, res) => {
    const post = req.body
    try {
        const savedPost = await savePost(post)
        if (savedPost) {
            res.status(201)
            .json({message: "Post created successfully.", savedPost: savedPost})
        } else {
            res.status(400)
            .json({message: "Failed to add post."})
        }
    } catch (error) {
        console.error(error)
        res.status(500)
        .json({error: "Failed to add post."})
    }
})

// Function to update post by Id from db
const updatePostById = async (postId, post) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(postId, post, {new: true})
        return updatedPost
    } catch (error) {
        throw error
    }
}

app.post('/posts/edit/:postId', async (req, res) => {
    const postId = req.params.postId
    const post = req.body
    
    try {
        const updatedPost = await updatePostById(postId, post)
        if (updatedPost) {
            res.status(200)
            .json({message: "Updated post successfully.", updatedPost: updatedPost})
        } else {
            res.status(400)
            .json({message: "Failed to update post."})
        }
    } catch (error) {
        console.error(error)
        res.status(500)
        .json({error: "Failed to update post."})
    }
})

// Function to delete post by Id from DB
const deletePostById = async (postId) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(postId)
        return deletedPost
    } catch (error) {
        throw error
    }
}

// DELETE method on '/:postId' route
app.delete('/user/posts/:postId', async (req, res) => {
    const postId = req.params.postId
    try {
        const deletedBook = await deletePostById(postId)
        if (deletedBook) {
            res.status(200)
            .json({message: "Post deleted successfully.", deletedBook: deletedBook})
        } else {
            res.status(400)
            .json({error: "Failed to delete post. "})
        }
    } catch (error) {
        console.error(error)
        res.status(500)
        .json({error: "Failed to delete post."})
    }
})

module.exports = app