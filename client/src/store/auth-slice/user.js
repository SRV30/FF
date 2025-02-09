import axiosInstance from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/user/login", credentials);
      const { accessToken, refreshToken, user, verifyEmail } =
        response.data.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("verifyEmail", verifyEmail);

      console.log("Retrieved User:", user);
      console.log("User:", JSON.parse(localStorage.getItem("user")));
      console.log("Access Token:", localStorage.getItem("accessToken"));
      console.log("Refresh Token:", localStorage.getItem("refreshToken"));
      console.log("Is Authenticated:", !!localStorage.getItem("accessToken"));

      return { accessToken, refreshToken, user };
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
      const { accessToken, user } = response.data.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      return { accessToken, user };
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
      localStorage.setItem("verifyEmail", response.data.data.verifyEmail);

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
      const { accessToken, user } = response.data?.data || {};

      if (accessToken && user) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));
      }
      return { accessToken, user };
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

// Admin
export const getAllUsers = createAsyncThunk(
  "auth/fetchusers",
  async ({ page = 1, limit = 10, search = "" }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/user/admin/get?page=${page}&limit=${limit}&search=${search}`,
        {
          withCredentials: true,
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

// Admin
export const getSingleUser = createAsyncThunk(
  "auth/getSingle",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/api/user/admin/get/${id}`, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

// Admin
export const updateUserStatus = createAsyncThunk(
  "auth/updateUserStatus",
  async ({ userId, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/api/user/admin/${userId}/status`,
        { status }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Admin
export const updateUserRole = createAsyncThunk(
  "admin/updateUserRole",
  async ({ email, role }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        "/api/user/admin/update",
        { email, role },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Admin
export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/user/admin/delete/${userId}`, {
        withCredentials: true,
      });
      return userId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const storedUser = localStorage.getItem("user");
const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: !!localStorage.getItem("accessToken"),
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  loading: false,
  error: null,
  users: [],
  singleUser: null,
  totalUsers: 0,
  totalPages: 0,
  success: false,
  verifyEmail: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { accessToken, refreshToken, user } = action.payload;
        state.loading = false;
        state.user = user;
        state.isAuthenticated = true;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.verifyEmail = action.payload.verifyEmail;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
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
        state.verifyEmail = false;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        localStorage.removeItem("verifyEmail");

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
        state.verifyEmail = action.payload.verifyEmail;
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

        localStorage.setItem("user", JSON.stringify(state.user));
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
      })

      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.totalUsers = action.payload.totalUsers;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Single User
      .addCase(getSingleUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.loading = false;
        state.singleUser = action.payload.data;
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update User Status
      .addCase(updateUserStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((user) =>
          user._id === action.payload.user._id ? action.payload.user : user
        );
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      // Update User Role
      .addCase(updateUserRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((user) =>
          user._id === action.payload.user._id ? action.payload.user : user
        );
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export const { clearError, clearState } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectLoading = (state) => state.auth.loading;
export const selectUser = (state) => state.auth.user;
export default authSlice.reducer;
