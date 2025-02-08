import axiosInstance from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/user/login", credentials);
      const { token, user } = response.data.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      console.log("Retrieved User:", user);
      return { token, user };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Invalid email or password!" }
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.get("/api/user/logout");

      return {};
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Logout failed!" }
      );
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/user/register", userData);
      const { token, user } = response.data.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      return { token, user };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Signup failed!" }
      );
    }
  }
);

export const getSingleDetail = createAsyncThunk(
  "auth/getSingleDetail",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/user/me");
      return response.data.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data ||
          error.message || { message: "Get user details failed!" }
      );
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        "/api/user/update-user",
        formData
      );
      const { token, user } = response.data.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      return { token, user };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Profile update failed!" }
      );
    }
  }
);

export const uploadAvatar = createAsyncThunk(
  "auth/uploadAvatar",
  async (avatarFile, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("avatar", avatarFile);

      const response = await axiosInstance.put(
        "/api/user/upload-avatar",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Upload failed");
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: !!localStorage.getItem("authToken"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed!";
      })

      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;

        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Logout failed!";
      })

      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Signup failed!";
      })

      .addCase(getSingleDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getSingleDetail.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Fetching user details failed!";
      })

      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Profile update failed!";
      })

      .addCase(uploadAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, avatar: action.payload.avatar };

        const updatedUser = { ...state.user, avatar: action.payload.avatar };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectLoading = (state) => state.auth.loading;
export const selectUser = (state) => state.auth.user;
export default authSlice.reducer;
