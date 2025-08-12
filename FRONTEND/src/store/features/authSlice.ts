// src/store/features/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUser, logoutUser } from "../../api/user.api";

interface AuthState {
  user: null | {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  isAuthenticated: boolean;
  loading: boolean; // Add loading state
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false, // Initialize loading as false
};

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCurrentUser();
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutUser();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to logout");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false; // Ensure loading is false after login
    },
    register: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false; // Ensure loading is false after register
    },
    getMe: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false; // Ensure loading is false after getMe
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false; // Ensure loading is false after logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true; // Set loading to true when fetching
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false; // Set loading to false on success
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false; // Set loading to false on failure
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false; // Ensure loading is false after logout
      });
  },
});

export const { login, logout: logoutAction, register, getMe } = authSlice.actions;
export default authSlice.reducer;