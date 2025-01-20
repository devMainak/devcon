import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import createApiClient from "../../utils/apiClient";

export const fetchBookmarkAsync = createAsyncThunk(
  "fetch/bookmarks",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token;
    const apiClient = createApiClient(token, dispatch);

    try {
      const response = await apiClient.get("/posts");
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to fetch bookmarks",
        status: error.response?.status || 500,
      });
    }
  }
);

export const addBookmarkAsync = createAsyncThunk(
  "add/bookmark",
  async ({ postId, userId }, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token;
    const apiClient = createApiClient(token, dispatch);

    try {
      const response = await apiClient.post(`/bookmarks/create/${postId}`, {
        userId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to add bookmark",
        status: error.response?.status || 500,
      });
    }
  }
);

export const removeBookmarkAsync = createAsyncThunk(
  "remove/bookmark",
  async ({ postId, userId }, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token;
    const apiClient = createApiClient(token, dispatch);

    try {
      const response = await apiClient.delete(`/bookmarks/delete/${postId}`, {
        data: { userId },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to add bookmark",
        status: error.response?.status || 500,
      });
    }
  }
);

export const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState: {
    bookmarks: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBookmarkAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchBookmarkAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.bookmarks = action.payload.posts;
    });
    builder.addCase(fetchBookmarkAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.error;
    });

    builder.addCase(addBookmarkAsync.fulfilled, (state, action) => {
      state.bookmarks = state.bookmarks.map((post) =>
        post._id === action.payload.bookmarkedPost._id
          ? action.payload.bookmarkedPost
          : post
      );
    });

    builder.addCase(removeBookmarkAsync.fulfilled, (state, action) => {
      state.bookmarks = state.bookmarks.filter(
        (post) => post._id !== action.payload.unBookmarkedPost._id
      );
    });
  },
});

export default bookmarksSlice.reducer;
