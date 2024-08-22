import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

// Async function to fetch users
export const fetchUsersAsync = createAsyncThunk('fetch/users', async () => {
    const response = await axios.get("http://localhost:3000/users")
    return response.data
})

// Defining initial state of users
export const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        status: "idle",
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        // Pending case for fetchUsersAsync
        builder.addCase(fetchUsersAsync.pending, (state) => {
            state.status = "loading"
        })
        // Fulfilled case for fetchUsersAsync
        builder.addCase(fetchUsersAsync.fulfilled, (state, action) => {
            state.status = "success"
            state.users = action.payload.users
        })
        // Rejected case for fetchUsersAsync
        builder.addCase(fetchUsersAsync.rejected, (state, action) => {
            state.status = "error",
            state.error = action.payload.error
        })
    }
})

// Exporting the reducer
export default usersSlice.reducer