import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


// Async function to fetch all the bookmarks
export const fetchBookmarkAsync = createAsyncThunk('fetch/bookmarks', async () => {
    const response = await axios.get('https://devcon-swart.vercel.app/users/bookmark')
    return response.data
})

// Async function to add bookmark
export const addBookmarkAsync = createAsyncThunk('add/bookmark', async (post) => {
    const response = await axios.post(`https://devcon-swart.vercel.app/users/bookmark/${post._id}`, post)
    return response.data
})

// Async function to remove bookmark
export const removeBookmarkAsync = createAsyncThunk('remove/bookmark', async (postId) => {
    const response = await axios.post(`https://devcon-swart.vercel.app/users/remove-bookmark/${postId}`)
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
            state.bookmarks = action.payload.bookmarks
        })
        // Rejected case for fetchBookmarkAsync
        builder.addCase(fetchBookmarkAsync.rejected, (state, action) => {
            state.status = "error"
            state.error = action.payload.error
        }),
        // Success case for addBookmarkAsync
        builder.addCase(addBookmarkAsync.fulfilled, (state, action) => {
            state.bookmarks.push(action.payload.bookmarkedPost)
        })
        // Success case for unbookmarkedAsync
        builder.addCase(removeBookmarkAsync.fulfilled, (state, action) => {
            state.bookmarks = state.bookmarks.filter(post => post._id !== action.payload.unBookmarkedPost._id)
        })
    }
})

// Export default reducer
export default bookmarksSlice.reducer