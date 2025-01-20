import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import createApiClient from "../../utils/apiClient";

// Async function to fetch posts
export const fetchPostsAsync = createAsyncThunk(
  "fetch/posts",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token; // Access the token from state
    const apiClient = createApiClient(token, dispatch);

    try {
      const response = await apiClient.get("/posts");
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to fetch posts",
        status: error.response?.status || 500,
      });
    }
  }
);

// Async function to add post
export const addPostAsync = createAsyncThunk(
  "add/post",
  async (post, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token; // Access the token from state
    const apiClient = createApiClient(token, dispatch);
    console.log(token);
    try {
      const response = await apiClient.post("/posts/create", post);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to add post",
        status: error.response?.status || 500,
      });
    }
  }
);

// Async function to update post
export const updatePostAsync = createAsyncThunk(
  "update/post",
  async ({ postId, post }, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token; // Access the token from state
    const apiClient = createApiClient(token, dispatch);
    try {
      const response = await apiClient.post(`/posts/edit/${postId}`, post);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to update post",
        status: error.response?.status || 500,
      });
    }
  }
);

// Async function to like a post
export const likePostAsync = createAsyncThunk(
  "like/post",
  async ({ postId, user }, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token; // Access the token from state
    const apiClient = createApiClient(token, dispatch);

    try {
      const response = await apiClient.post(`/posts/like/${postId}`, {
        likedUserId: user._id,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to like post",
        status: error.response?.status || 500,
      });
    }
  }
);

// Async function to dislike a post
export const dislikePostAsync = createAsyncThunk(
  "dislike/post",
  async ({ postId, user }, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token; // Retrieve token from Redux state
    const apiClient = createApiClient(token, dispatch);

    try {
      const response = await apiClient.post(`/posts/dislike/${postId}`, {
        dislikedUserId: user._id,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to dislike post",
        status: error.response?.status || 500,
      });
    }
  }
);

// Async function to delete post
export const deletePostAsync = createAsyncThunk(
  "delete/post",
  async (postId, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token;
    const apiClient = createApiClient(token, dispatch);
    try {
      const response = await apiClient.delete(`/posts/delete/${postId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to delete post",
        status: error.response?.status || 500,
      });
    }
  }
);

// Defining the posts slice
export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
    sortByDate: "",
  },
  reducers: {
    // For handling sort by date
    handleSortByDate: (state, action) => {
      state.sortByDate = action.payload;
    },
    // For updating bookmarked status of post
    markAsBookmarked: (state, action) => {
      const { postId, userId } = action.payload;
      state.posts = state.posts.map((post) =>
        post._id === postId
          ? {
              ...post,
              bookmarks: post.bookmarks.includes(userId)
                ? post.bookmarks // Avoid duplicate bookmarks
                : [...post.bookmarks, userId],
            }
          : post
      );
    },
    // For updating unbookmarked status of post
    unmarkAsBookmarked: (state, action) => {
      const { postId, userId } = action.payload;
      state.posts = state.posts.map((post) =>
        post._id === postId
          ? {
              ...post,
              bookmarks: post.bookmarks.filter((id) => id !== userId),
            }
          : post
      );
    },
  },
  extraReducers: (builder) => {
    // Pending case for fetchPostsAsync
    builder.addCase(fetchPostsAsync.pending, (state) => {
      state.status = "loading";
    });
    // Success case for fetchPostsAsync
    builder.addCase(fetchPostsAsync.fulfilled, (state, action) => {
      (state.status = "success"), (state.posts = action.payload.posts)
      console.log(action.payload.posts)
      ;
    });
    // Rajected case for fetchPostsAsync
    builder.addCase(fetchPostsAsync.rejected, (state, action) => {
      state.status = "error";
      console.log(action.payload);
      state.error = action.payload.error;
    });
    // Success case for addPostAsync
    builder.addCase(addPostAsync.fulfilled, (state, action) => {
      state.posts.push(action.payload.savedPost);
    });
    // Success case for updatePostAsync
    builder.addCase(updatePostAsync.fulfilled, (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload.updatedPost._id
          ? action.payload.updatedPost
          : post
      );
    });
    // Success case for deletePostAsync
    builder.addCase(deletePostAsync.fulfilled, (state, action) => {
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload.deletedPost._id
      );
    });
    // Success case for likePostAsync
    builder.addCase(likePostAsync.fulfilled, (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload.likedPost._id
          ? action.payload.likedPost
          : post
      );
    });
    // Success case for dislikePostAsync
    builder.addCase(dislikePostAsync.fulfilled, (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload.dislikedPost._id
          ? action.payload.dislikedPost
          : post
      );
    });
  },
});

// Exporting the action creators
export const {
  handleSortByDate,
  markAsBookmarked,
  unmarkAsBookmarked,
} = postsSlice.actions;

// exporting the reducer for the store
export default postsSlice.reducer;
