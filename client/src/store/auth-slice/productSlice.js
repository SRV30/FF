import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/api";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/product/get");
      return response.data.data;
     
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch products");
    }
  }
);

const initialState = {
  product: [],
  loadingCategory: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loadingCategory = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loadingCategory = false;
        state.product = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loadingCategory = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
