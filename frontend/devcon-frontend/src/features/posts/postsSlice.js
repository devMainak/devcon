import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../utils/apiClient";

export const fetchPostsAsync = createAsyncThunk(
  "fetch/posts",
  async (_, { rejectWithValue }) => {
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

export const addPostAsync = createAsyncThunk(
  "add/post",
  async (post, { rejectWithValue }) => {
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

export const updatePostAsync = createAsyncThunk(
  "update/post",
  async ({ postId, post }, { rejectWithValue }) => {
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

export const likePostAsync = createAsyncThunk(
  "like/post",
  async ({ postId, user }, { rejectWithValue }) => {
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

export const dislikePostAsync = createAsyncThunk(
  "dislike/post",
  async ({ postId, user }, { rejectWithValue }) => {
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

export const deletePostAsync = createAsyncThunk(
  "delete/post",
  async (postId, { rejectWithValue }) => {
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

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
    sortByDate: "",
  },
  reducers: {
    handleSortByDate: (state, action) => {
      state.sortByDate = action.payload;
    },
    markAsBookmarked: (state, action) => {
      const { postId, userId } = action.payload;
      state.posts = state.posts.map((post) =>
        post._id === postId
          ? {
              ...post,
              bookmarks: post.bookmarks.includes(userId)
                ? post.bookmarks
                : [...post.bookmarks, userId],
            }
          : post
      );
    },
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
    // Cases for fetchPostsAsync
    builder.addCase(fetchPostsAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchPostsAsync.fulfilled, (state, action) => {
      (state.status = "success"), (state.posts = action.payload.posts);
    });
    builder.addCase(fetchPostsAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.error;
    });

    // Cases for addPostAsync
    builder.addCase(addPostAsync.fulfilled, (state, action) => {
      state.posts.push(action.payload.savedPost);
    });

    // Cases for updatePostAsync
    builder.addCase(updatePostAsync.fulfilled, (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload.updatedPost._id
          ? action.payload.updatedPost
          : post
      );
    });

    // Cases for deletePostAsync
    builder.addCase(deletePostAsync.fulfilled, (state, action) => {
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload.deletedPost._id
      );
    });

    // Cases for likePostAsync
    builder.addCase(likePostAsync.fulfilled, (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload.likedPost._id
          ? action.payload.likedPost
          : post
      );
    });

    // Cases for dislikePostAsync
    builder.addCase(dislikePostAsync.fulfilled, (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload.dislikedPost._id
          ? action.payload.dislikedPost
          : post
      );
    });
  },
});

export const { handleSortByDate, markAsBookmarked, unmarkAsBookmarked } =
  postsSlice.actions;

export default postsSlice.reducer;
