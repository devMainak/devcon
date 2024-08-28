import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Async function to fetch all the bookmarks
export const fetchBookmarkAsync = createAsyncThunk('fetch/bookmarks', async () => {
    const response = await axios.get('http://localhost:3000/users/bookmark')
    return response.data
})

// Async function to add bookmark
export const addBookmarkAsync = createAsyncThunk('add/bookmark', async (post) => {
    const response = await axios.post(`http://localhost:3000/users/bookmark/${post._id}`, post)
    return response.data
})

// Async function to remove bookmark
export const removeBookmarkAsync = createAsyncThunk('remove/bookmark', async (postId) => {
    const response = await axios.post(`http://localhost:3000/users/remove-bookmark/${post._id}`)
    return response.data
})

// Creating the bookmarks slice
export const bookmarksSlice = createSlice({
    name: "bookmarks",
    initialState: {
        bookmarks: [],
        status: "idle",
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        // Pending case for fetchBookmarkAsync
        builder.addCase(fetchBookmarkAsync.pending, (state) => {
            state.status = "loading"
        })
        // Success case for fetchBookmarkAsync
        builder.addCase(fetchBookmarkAsync.fulfilled, (state, action) => {
            state.status = "success"
            state.booksmarks = action.payload.booksmarks
        })
        // Rejected case for fetchBookmarkAsync
        builder.addCase(fetchBookmarkAsync.rejected, (state, action) => {
            state.status = "error"
            state.error = action.payload.error
        })
    }
})

// Export default reducer
export default bookmarksSlice.reducer