import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/api";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/product/get");
      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const getProductByFilter = createAsyncThunk(
  "products/getProductByFilter",
  async (
    { page = 1, limit = 10, searchQuery = "", selectedCategories =[], sortBy = "relevant", priceRange=[0, 100000] },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get("/api/product/get/filter", {
        params: {
          page,
          limit,
          search: searchQuery,
          category: selectedCategories.length > 0 ? selectedCategories.join(",") : undefined,
          sortBy,
          minPrice: priceRange?.[0] ?? 0,
          maxPrice: priceRange?.[1] ?? 100000,
        },
      });
      console.log("API Response:", response.data); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  product: [],
  loadingCategory: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
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
      })

      .addCase(getProductByFilter.pending, (state) => {
        (state.loadingCategory = true), (state.error = null);
      })
      .addCase(getProductByFilter.fulfilled, (state, action) => {
        state.loadingCategory = false;
        state.product = action.payload.products;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getProductByFilter.rejected, (state, action) => {
        state.loadingCategory = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
