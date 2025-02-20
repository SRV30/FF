import axiosInstance from "@/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, selectedColor, selectedSize }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.post(
        "/api/cart/create",
        { productId, selectedColor, selectedSize },
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
        error.response?.data?.message || "Failed to add item to cart"
      );
    }
  }
);

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/api/cart/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },

        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart items"
      );
    }
  }
);

export const updateCartItemQty = createAsyncThunk(
  "cart/updateCartItemQty",
  async ({ _id, qty }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.put(
        "/api/cart/update",
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
        error.response?.data?.message || "Failed to update cart quantity"
      );
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (_id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.delete("/api/cart/delete", {
        data: { _id },
        withCredentials: true,

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete cart item"
      );
    }
  }
);

const calculateFinalTotal = (cartItems) => {
  if (!Array.isArray(cartItems)) return 0;

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.productId?.price || 0) * item.quantity,
    0
  );

  const totalDiscount = cartItems.reduce(
    (total, item) =>
      total +
      ((item.productId?.price * (item.productId?.discount || 0)) / 100) *
        item.quantity,
    0
  );

  const shipping =
    totalPrice <= 500 ? 100 : totalPrice > 500 && totalPrice <= 1000 ? 50 : 0;

  return totalPrice - totalDiscount + shipping;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    loading: false,
    error: null,
    finalTotal: 0,
  },
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
      state.finalTotal = calculateFinalTotal(action.payload);
    },
    updateQuantity: (state, action) => {
      const { _id, quantity } = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item._id === _id ? { ...item, quantity } : item
      );
      state.finalTotal = calculateFinalTotal(state.cartItems);
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems.push(action.payload.data);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.data;
        state.finalTotal = calculateFinalTotal(action.payload.data);
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateCartItemQty.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartItemQty.fulfilled, (state, action) => {
        state.loading = false;
        const updatedItem = action.payload.data;
        state.cartItems = state.cartItems.map((item) =>
          item._id === updatedItem._id
            ? { ...item, quantity: updatedItem.quantity }
            : item
        );
        state.finalTotal = calculateFinalTotal(state.cartItems);
      })
      .addCase(updateCartItemQty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.meta.arg
        );
        state.finalTotal = calculateFinalTotal(state.cartItems);
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCartItems, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
