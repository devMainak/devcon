import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

// Async function to fetch posts
export const fetchPostsAsync = createAsyncThunk('fetch/posts', async () => {
    const response = await axios.get("http://localhost:3000/posts")
    return response.data
})

// Async function to add post
export const addPostAsync = createAsyncThunk('add/post', async (post) => {
    const response = await axios.post("http://localhost:3000/user/post", post)
    return response.data
})

// Async function to update post
export const updatePostAsync = createAsyncThunk('update/post', async ({postId, post}) => {
    const response = await axios.post(`http://localhost:3000/posts/edit/${postId}`, post)
    return response.data
})

// Async function to like a post
export const likePostAsync = createAsyncThunk('like/post', async ({postId, post}) => {
    const response = await axios.post(`http://localhost:3000/posts/like/${postId}`, post)
    return response.data
})

// Async function to dislike a post
export const dislikePostAsync = createAsyncThunk('dislike/post', async ({postId, post}) => {
    const response = await axios.post(`http://localhost:3000/posts/dislike/${postId}`, post)
    return response.data
})

// Async function to delete post
export const deletePostAsync = createAsyncThunk('delete/post', async (postId) => {
    const response = await axios.delete(`http://localhost:3000/user/posts/${postId}`)
    return response.data
})

// Defining the posts slice
export const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        status: "idle",
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        // Pending case for fetchPostsAsync
        builder.addCase(fetchPostsAsync.pending, (state) => {
            state.status = "loading"
        })
        // Success case for fetchPostsAsync
        builder.addCase(fetchPostsAsync.fulfilled, (state, action) => {
            state.status = "success",
            state.posts = action.payload
        })
        // Rajected case for fetchPostsAsync
        builder.addCase(fetchPostsAsync.rejected, (state, action) => {
            state.status = "error"
            state.error = action.payload.error
        })
        // Success case for addPostAsync
        builder.addCase(addPostAsync.fulfilled, (state, action) => {
            state.posts.push(action.payload.savedPost)
        })
        // Success case for updatePostAsync
        builder.addCase(updatePostAsync.fulfilled, (state, action) => {
            state.posts = state.posts.map(post => post._id === action.payload.updatedPost._id ? action.payload.updatedPost : post)
        })
        // Success case for deletePostAsync
        builder.addCase(deletePostAsync.fulfilled, (state, action) => {
            state.posts = state.posts.filter(post => post._id !== action.payload.deletedPost._id)
        })
        // Success case for likePostAsync
        builder.addCase(likePostAsync.fulfilled, (state, action) => {
            state.posts = state.posts.map(post => post._id === action.payload.likedPost._id ? action.payload.likedPost : post)
        })
        // Success case for dislikePostAsync
        builder.addCase(dislikePostAsync.fulfilled, (state, action) => {
            state.posts = state.posts.map(post => post._id === action.payload.dislikedPost._id ? action.payload.dislikedPost : post)
        })
    }
})

// exporting the reducer for the store
export default postsSlice.reducer