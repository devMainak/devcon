import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Creating the bookmarks slice
export const bookmarksSlice = createSlice({
    name: "bookmarks",
    initialState: {
        booksmarks: [],
        status: "idle",
        error: null
    },
    reducers: {},
    extraReducers: {}
})

// Export default reducer
export default bookmarksSlice.reducer