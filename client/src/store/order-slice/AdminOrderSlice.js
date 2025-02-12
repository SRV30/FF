// src/store/adminOrdersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/api';

// Fetch all orders (Admin)
export const getAllOrders = createAsyncThunk(
  'adminOrders/getAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/order/get/admin', { withCredentials: true });
      // Assuming the backend returns { success: true, totalOrders: ..., orders: [...] }
      return response.data.orders;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update order status (Admin)
export const updateOrderStatus = createAsyncThunk(
  'adminOrders/updateOrderStatus',
  async ({ orderId, orderStatus, trackingId, notes }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/api/order/admin/update/${orderId}`,
        { orderStatus, trackingId, notes },
        { withCredentials: true }
      );
      // Assuming the response contains the updated order in response.data.order
      return response.data.order;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete order (Admin)
export const deleteOrder = createAsyncThunk(
  'adminOrders/deleteOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/order/admin/delete/${orderId}`, { withCredentials: true });
      return orderId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// (Optional) Get single order details
export const getSingleOrder = createAsyncThunk(
  'adminOrders/getSingleOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/order/get/${orderId}`, { withCredentials: true });
      return response.data.order;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const adminOrdersSlice = createSlice({
  name: 'adminOrders',
  initialState: {
    orders: [],
    singleOrder: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSingleOrder: (state) => {
      state.singleOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Orders
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        // Replace the updated order in the orders array
        state.orders = state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        );
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Order
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter((order) => order._id !== action.payload);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Single Order
      .addCase(getSingleOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.singleOrder = action.payload;
      })
      .addCase(getSingleOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSingleOrder } = adminOrdersSlice.actions;
export default adminOrdersSlice.reducer;
