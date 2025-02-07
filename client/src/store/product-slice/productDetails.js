import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/api";

// ✅ Fetch Product Details
export const getProductDetails = createAsyncThunk(
  "product/getDetails",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/product/get/${productId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product details"
      );
    }
  }
);

// ✅ Fetch Reviews
export const getProductReviews = createAsyncThunk(
  "product/getReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/product/reviews/${productId}`
      );
      return response.data.reviews;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch reviews"
      );
    }
  }
);

// ✅ Post Review
export const postReview = createAsyncThunk(
  "product/postReview",
  async ({ productId, reviewData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/api/product/review/${productId}`,
        reviewData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to post review"
      );
    }
  }
);

export const deleteReview = createAsyncThunk(
  "product/deleteReview",
  async ({ productId, reviewId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/api/product/review/${productId}/${reviewId}`
      );
      console.log(response.data);
      return { productId, reviewId }; 
      
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete review"
      );
    }
  }
);

// ✅ Fetch Similar Products by Gender
export const getSimilarProducts = createAsyncThunk(
  "product/getSimilar",
  async (gender, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/product/gender/${gender}`);
      return response.data.products;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch similar products"
      );
    }
  }
);

const initialState = {
  product: null,
  reviews: [],
  similarProducts: [],
  loading: false,
  error: null,
  reviewPosting: false,
};

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    clearProductErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Product Details
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Reviews
      .addCase(getProductReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(getProductReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Post Review
      .addCase(postReview.pending, (state) => {
        state.reviewPosting = true;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.reviewPosting = false;
        state.reviews.push(action.payload.review);
      })
      .addCase(postReview.rejected, (state, action) => {
        state.reviewPosting = false;
        state.error = action.payload;
      })

      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the review from the reviews array
        state.reviews = state.reviews.filter(
          (review) => review._id !== action.payload.reviewId
        );
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Similar Products
      .addCase(getSimilarProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.similarProducts = action.payload;
      })
      .addCase(getSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProductErrors } = productDetailsSlice.actions;
export default productDetailsSlice.reducer;
