import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import createApiClient from "../../utils/apiClient";

export const fetchUsersAsync = createAsyncThunk(
  "fetch/users",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token;
    const apiClient = createApiClient(token, dispatch);
    try {
      const response = await apiClient.get("/users");
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to fetch users",
        status: error.response?.status || 500,
      });
    }
  }
);

export const followUserAsync = createAsyncThunk(
  "follow/user",
  async (
    { userId, followedUserId },
    { getState, dispatch, rejectWithValue }
  ) => {
    const state = getState();
    const token = state.auth.token;
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

export const unfollowUserAsync = createAsyncThunk(
  "unfollow/user",
  async (
    { userId, unfollowedUserId },
    { getState, dispatch, rejectWithValue }
  ) => {
    const state = getState();
    const token = state.auth.token;
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

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Cases for fetchUsersAsync
    builder.addCase(fetchUsersAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUsersAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.users = action.payload.users;
    });
    builder.addCase(fetchUsersAsync.rejected, (state, action) => {
      (state.status = "error"), (state.error = "Failed to fetch users.");
    });

    // Cases for followUserAsync
    builder.addCase(followUserAsync.fulfilled, (state, action) => {
      state.users = state.users.map((user) =>
        user._id === action.payload.updatedUser._id
          ? action.payload.updatedUser
          : user
      );
    });

    // Cases for followUserAsync
    builder.addCase(unfollowUserAsync.fulfilled, (state, action) => {
      state.users = state.users.map((user) =>
        user._id === action.payload.updatedUser._id
          ? action.payload.updatedUser
          : user
      );
    });

    // Cases for updateUserProfileAsync
    builder.addCase(updateUserProfileAsync.fulfilled, (state, action) => {
      state.users = state.users.map((user) =>
        user._id === action.payload.updatedUser._id
          ? action.payload.updatedUser
          : user
      );
    });
  },
});

export default usersSlice.reducer;
