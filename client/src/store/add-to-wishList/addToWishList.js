import axiosInstance from "@/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addToWishList = createAsyncThunk(
  "wishList/addToWishList",
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.post(
        "/api/wishlist/create",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add item to WishList"
      );
    }
  }
);

export const getWishListItems = createAsyncThunk(
  "wishList/getWishListItems",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/api/wishlist/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },

        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch WishList items"
      );
    }
  }
);

export const updateWishListItemQty = createAsyncThunk(
  "wishList/updateWishListItemQty",
  async ({ _id, qty }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.put(
        "/api/wishList/update",
        { _id, qty },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update WishList quantity"
      );
    }
  }
);

export const deleteWishListItem = createAsyncThunk(
  "wishList/deleteWishListItem",
  async (_id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.delete("/api/wishList/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },

        data: { _id },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete WishList item"
      );
    }
  }
);

const WishListSlice = createSlice({
  name: "wishList",
  initialState: {
    WishListItems: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(addToWishList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishList.fulfilled, (state, action) => {
        state.loading = false;
        state.WishListItems.push(action.payload.data);
      })
      .addCase(addToWishList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getWishListItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWishListItems.fulfilled, (state, action) => {
        state.loading = false;
        state.WishListItems = action.payload.data;
      })
      .addCase(getWishListItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateWishListItemQty.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateWishListItemQty.fulfilled, (state, action) => {
        state.loading = false;
        const updatedItem = action.payload.data;
        state.WishListItems = state.WishListItems.map((item) =>
          item._id === updatedItem._id ? updatedItem : item
        );
      })
      .addCase(updateWishListItemQty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteWishListItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteWishListItem.fulfilled, (state, action) => {
        state.loading = false;
        state.WishListItems = state.WishListItems.filter(
          (item) => item._id !== action.meta.arg
        );
      })
      .addCase(deleteWishListItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default WishListSlice.reducer;
