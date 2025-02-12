import axiosInstance from "@/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/api/payment/razorpay/order", orderData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyPayment = createAsyncThunk(
  "order/verifyPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/api/payment/razorpay/verify", paymentData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const onlineSlice = createSlice({
  name: "online",
  initialState: {
    order: null,
    orderId: null,
    loading: false,
    paymentSuccess: false,
    error: null,
  },
  reducers: {
    resetOrder: (state) => {
      state.order = null;
      state.orderId = null;
      state.paymentSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle Order Creation
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
        state.orderId = action.payload.orderId;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle Payment Verification
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyPayment.fulfilled, (state) => {
        state.loading = false;
        state.paymentSuccess = true;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrder } = onlineSlice.actions;
export default onlineSlice.reducer;
