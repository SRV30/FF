import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/api";
export const userAddress = createAsyncThunk("auth/userAdress", async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/address/get");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to create address" }
      );
    }
  }
  );

  const initialState = {
    address: [],
    loading: false,
    error: null,
  };

  const addressSlice= createSlice({
    name: "address",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
      builder
        .addCase(userAddress.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(userAddress.fulfilled, (state, action) => {
          state.loading = false;
          state.address = action.payload;
        })
        .addCase(userAddress.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload?.message || "Failed to create address";
        });
    },
  })


  export default addressSlice.reducer;
