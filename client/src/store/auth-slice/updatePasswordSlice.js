import axiosInstance from "@/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const updatePassword = createAsyncThunk(
  "updatePassword/reset",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/api/user/reset-password", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong.");
    }
  }
);

const updatePasswordSlice = createSlice({
  name: "updatePassword",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export default updatePasswordSlice.reducer;
