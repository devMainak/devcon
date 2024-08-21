// src/app.js

const express = require('express')
const cors = require('cors')
// Data models
const Post = require('./models/post.model')
const User = require('./models/user.model')

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

// Function to get all users
const readAllUsers = async () => {
    try {
        const users = await User.find()
        return users
    } catch (error) {
        throw new Error(error)
    } 
}

// GET method on '/users' to fetch all the users
app.get('/users', async (req, res) => {
    try {
        const users = await readAllUsers()
        if (users.length > 0)
        {
            res.status(200)
            .json({message: "Users fetched successfully.", users: users})
        } else {
            res.status(404)
            .json({message: "No user found."})
        }
    } catch (error) {
        console.error(error)
        res.status(500)
        .json({error: "Failed to fetch users."})
    }
})

// Function to seed new user in DB
const saveNewUser = async (user) => {
    try {
        const newUser = new User(user)
        const savedUser = await newUser.save()
        return savedUser
    } catch (error) {
        throw error
    }
}

// POST method on '/users/user' to save new user
app.post('/users/user', async (req, res) => {
    const newUser = req.body
    try {
        const savedUser = await saveNewUser(newUser)
        if (savedUser) {
            res.status(201)
            .json({message: "User added successfully.", savedUser: savedUser})
        } else {
            res.status(400)
            .json({message: "Failed to add user."})
        }
    } catch (error) {
        console.error(error)
        res.status(500)
        .json({error: "Failed to save user."})
    }
})

// Function to follow user in DB
const updateUserBeingFollowed = async (userId) => {
    try {
        const updatedUser = await User.findOneAndUpdate({_id: userId}, {isFollowed: true}, {new: true})
        return updatedUser
    } catch (error) {
        throw new Error(error)
    }
}

// POST method on '/users/follow/:userId' to follow user
app.post('/users/follow/:userId', async (req, res) => {
    const userId = req.params.userId
    try {
        const updatedUser = await updateUserBeingFollowed(userId)
        if (updatedUser) {
            res.status(200)
            .json({message: `Followed ${updatedUser.name}.`, updatedUser: updatedUser})
        } else {
            res.status(400)
            .json({message: "Failed to complete the follow request."})
        }
    } catch (error) {
        console.error(error)
        res.status(500)
        .json({error: "Failed to complete the follow request."})
    }
})

// Function to unfollow user in DB
const updateUserBeingUnfollowed = async (userId) => {
    try {
        const updatedUser = await User.findOneAndUpdate({_id: userId}, {isFollowed: false}, {new: true})
        return updatedUser
    } catch (error) {
        throw new Error(error)
    }
}

// POST method on '/users/follow/:userId' to follow user
app.post('/users/unfollow/:userId', async (req, res) => {
    const userId = req.params.userId
    try {
        const updatedUser = await updateUserBeingUnfollowed(userId)
        if (updatedUser) {
            res.status(200)
            .json({message: `Unfollowed ${updatedUser.name}.`, updatedUser: updatedUser})
        } else {
            res.status(400)
            .json({message: "Failed to complete the unfollow request."})
        }
    } catch (error) {
        console.error(error)
        res.status(500)
        .json({error: "Failed to complete the unfollow request."})
    }
})



// Exporting the app module 
module.exports = app