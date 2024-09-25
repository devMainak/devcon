import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async function to fetch users
export const fetchUsersAsync = createAsyncThunk("fetch/users", async () => {
  const response = await axios.get("https://devcon-swart.vercel.app/users");
  return response.data;
});

// Async function to follow
export const followUserAsync = createAsyncThunk(
  "follow/user",
  async (userId) => {
    const response = await axios.post(
      `https://devcon-swart.vercel.app/users/follow/${userId}`
    );
    return response.data;
  }
);

// Async function to follow
export const unfollowUserAsync = createAsyncThunk(
  "unfollow/user",
  async (userId) => {
    const response = await axios.post(
      `https://devcon-swart.vercel.app/users/unfollow/${userId}`
    );
    return response.data;
  }
);

// Defining initial state of users
export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Pending case for fetchUsersAsync
    builder.addCase(fetchUsersAsync.pending, (state) => {
      state.status = "loading";
    });
    // Fulfilled case for fetchUsersAsync
    builder.addCase(fetchUsersAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.users = action.payload.users;
    });
    // Rejected case for fetchUsersAsync
    builder.addCase(fetchUsersAsync.rejected, (state, action) => {
      (state.status = "error"), (state.error = action.payload.error);
    });
    // Fulfilled case for followUserAsync
    builder.addCase(followUserAsync.fulfilled, (state, action) => {
      console.log(action.payload);
      state.users = state.users.map((user) =>
        user._id === action.payload.updatedUser._id ? action.payload.updatedUser : user
      );
    });
    // Fulfilled case for followUserAsync
    builder.addCase(unfollowUserAsync.fulfilled, (state, action) => {
      console.log(action.payload);
      state.users = state.users.map((user) =>
        user._id === action.payload.updatedUser._id ? action.payload.updatedUser : user
      );
    });
  },
});

// Exporting the reducer
export default usersSlice.reducer;
