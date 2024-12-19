import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import createApiClient from "../../utils/apiClient";

// Async function to fetch users
export const fetchUsersAsync = createAsyncThunk(
  "fetch/users",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token; // Access the token from state
    const apiClient = createApiClient(token, dispatch);

    try {
      const response = await apiClient.get("/users");
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to fetch users",
        status: error.response?.status || 500,
      });
    }
  }
);

// Async function to follow a user
export const followUserAsync = createAsyncThunk(
  "follow/user",
  async (
    { userId, followedUserId },
    { getState, dispatch, rejectWithValue }
  ) => {
    const state = getState();
    const token = state.auth.token; // Retrieve token from Redux state
    const apiClient = createApiClient(token, dispatch);

    try {
      const response = await apiClient.post(`/users/follow/${followedUserId}`, {
        userId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to follow user",
        status: error.response?.status || 500,
      });
    }
  }
);

// Async function to unfollow a user
export const unfollowUserAsync = createAsyncThunk(
  "unfollow/user",
  async (
    { userId, unfollowedUserId },
    { getState, dispatch, rejectWithValue }
  ) => {
    const state = getState();
    const token = state.auth.token; // Retrieve token from Redux state
    const apiClient = createApiClient(token, dispatch);

    try {
      const response = await apiClient.post(
        `/users/unfollow/${unfollowedUserId}`,
        { userId }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to unfollow user",
        status: error.response?.status || 500,
      });
    }
  }
);

// Update user profile datails
export const updateUserProfileAsync = createAsyncThunk(
  "update/user",
  async ({ userId, updatedData }, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token;
    const apiClient = createApiClient(token, dispatch);

    try {
      const response = await apiClient.post(`/users/update/${userId}`, {
        updatedData,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message:
          error.response?.data?.message || "Failed to update user details",
        status: error.response?.status || 500,
      });
    }
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
      (state.status = "error"), (state.error = "Failed to fetch users.");
    });
    // Fulfilled case for followUserAsync
    builder.addCase(followUserAsync.fulfilled, (state, action) => {
      state.users = state.users.map((user) =>
        user._id === action.payload.updatedUser._id
          ? action.payload.updatedUser
          : user
      );
    });
    // Fulfilled case for followUserAsync
    builder.addCase(unfollowUserAsync.fulfilled, (state, action) => {
      state.users = state.users.map((user) =>
        user._id === action.payload.updatedUser._id
          ? action.payload.updatedUser
          : user
      );
    });
    // Fulfilled case for updateUserProfileAsync
    builder.addCase(updateUserProfileAsync.fulfilled, (state, action) => {
      state.users = state.users.map((user) =>
        user._id === action.payload.updatedUser._id
          ? action.payload.updatedUser
          : user
      );
    });
  },
});

// Exporting the reducer
export default usersSlice.reducer;
