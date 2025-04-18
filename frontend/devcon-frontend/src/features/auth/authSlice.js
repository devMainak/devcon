import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiClient from "../../utils/apiClient";

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (authCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://devcon-swart.vercel.app/auth/login",
        authCredentials,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerAsync = createAsyncThunk(
  "auth/register",
  async (newUser, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://devcon-swart.vercel.app/auth/register",
        newUser
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const refreshTokenAsync = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://devcon-swart.vercel.app/auth/refresh",
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutAsync = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(
        "/auth/logout",
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to log out",
        status: error.response?.status || 500,
      });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    addNewFollower: (state, action) => {
      state.user.following.push(action.payload.followedUserId);
    },
    removeExistingFollower: (state, action) => {
      state.user.following = state.user.following.filter(
        (userId) => userId !== action.payload.unfollowedUserId
      );
    },
    updateUserDetails: (state, action) => {
      const { profileBio, userImageUrl } = action.payload;
      state.user.profileBio = profileBio;
      state.user.userImageUrl = userImageUrl;
    },
  },
  extraReducers: (builder) => {
    // Login cases
    builder.addCase(loginAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error || "Login failed";
    });

    // Register cases
    builder.addCase(registerAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerAsync.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(registerAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Registration failed";
    });

    // Refresh token cases
    builder.addCase(refreshTokenAsync.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    });
    builder.addCase(refreshTokenAsync.rejected, (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    });

    // Logout cases
    builder.addCase(logoutAsync.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    });
  },
});

export const {
  logout,
  resetError,
  addNewFollower,
  removeExistingFollower,
  updateUserDetails,
} = authSlice.actions;

export default authSlice.reducer;
