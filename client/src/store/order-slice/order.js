import axiosInstance from "@/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";




// Async Thunks
export const createOrder = createAsyncThunk("order/createOrder", async (orderData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/api/order/create", orderData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getSingleOrder = createAsyncThunk("order/getSingleOrder", async (orderId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/${orderId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const myOrders = createAsyncThunk("order/myOrders", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/api/order/myorder");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const cancelOrder = createAsyncThunk("order/cancelOrder", async (orderId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put(`${API_BASE_URL}/cancel/${orderId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteOrder = createAsyncThunk("order/deleteOrder", async (orderId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`${API_BASE_URL}/delete/${orderId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    order: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSingleOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      })
      .addCase(getSingleOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(myOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(myOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
      })
      .addCase(myOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.orders = state.orders.map(order => order._id === action.payload.order._id ? action.payload.order : order);
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(order => order._id !== action.meta.arg);
      });
  },
});

export default orderSlice.reducer;
