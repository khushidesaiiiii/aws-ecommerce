import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetAllOrders,
  GetOrders,
  PlaceOrder,
  UpdateOrderStatus,
} from "../services/orderService";

export const placeUserOrder = createAsyncThunk(
  "orders/placeOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      return await PlaceOrder(orderData);
    } catch (err) {
      console.error(err);

      return rejectWithValue(err.message);
    }
  },
);

export const getUserOrders = createAsyncThunk(
  "orders/getUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      return await GetOrders();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const getAllOrder = createAsyncThunk(
  "orders/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      return await GetAllOrders();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const updateOrdStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      console.log("Updating order status:", { orderId, status });
      //debugger;
      return await UpdateOrderStatus(orderId, status);
    } catch (err) {
      console.error("Error updating order status:", err);
      return rejectWithValue(err.message);
    }
  },
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (Builder) => {
    Builder.addCase(placeUserOrder.pending, (state) => {
      state.loading = true;
    })
      .addCase(placeUserOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = [action.payload, ...state.orders];
      })
      .addCase(placeUserOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getAllOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(getAllOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateOrdStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrdStatus.fulfilled, (state, action) => {
        state.loading = false;

        const updated = action.payload;
        if (!updated) return;

        const index = state.orders.findIndex(
          (o) => o.orderId === updated.orderId,
        );

        if (index !== -1) {
          state.orders[index] = updated;
        }
      })
      .addCase(updateOrdStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
