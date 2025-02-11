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
    {
      page = 1,
      limit = 10,
      searchQuery = "",
      selectedCategories = [],
      sortBy = "relevant",
      priceRange = [0, 100000],
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get("/api/product/get/filter", {
        params: {
          page,
          limit,
          search: searchQuery,
          category:
            selectedCategories.length > 0
              ? selectedCategories.join(",")
              : undefined,
          sortBy,
          minPrice: priceRange?.[0] ?? 0,
          maxPrice: priceRange?.[1] ?? 100000,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching products");
    }
  }
);

export const getProductsByGender = createAsyncThunk(
  "products/getByGender",
  async (category, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/product/category/${category}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  product: [],
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
  count: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProductErrors: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(getProductByFilter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductByFilter.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.products;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getProductByFilter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    
      .addCase(getProductsByGender.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsByGender.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.products;
        state.count = action.payload.count;
      })
      .addCase(getProductsByGender.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.product = [];
        state.count = 0;
      });
  },
});


export const { clearProductErrors } = productSlice.actions;
export const selectProducts = (state) => state.product.product;
export const selectProductsLoading = (state) => state.product.loading;
export const selectProductsError = (state) => state.product.error;
export const selectProductsCount = (state) => state.product.count;

export default productSlice.reducer;
