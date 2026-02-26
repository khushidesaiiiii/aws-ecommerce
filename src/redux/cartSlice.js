import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AddToCart,
  deleteCartItem,
  //addToCart,
  // getCart,
  getCartData,
  UpdateCart,
  //removeCartItem,
  //updateCartItem,
} from "../services/cartService";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      return await getCartData();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const addItem = createAsyncThunk(
  "cart/addItem",
  async (product, { rejectWithValue }) => {
    try {
      return await AddToCart(product);
    } catch (err) {
      console.error("Error adding to cart:", err);
      return rejectWithValue(err.message);
    }
  },
);

export const updateItem = createAsyncThunk(
  "cart/updateItem",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      return await UpdateCart(productId, quantity);
    } catch (errr) {
      return rejectWithValue(errr.message);
    }
  },
);

export const deleteItem = createAsyncThunk(
  "cart/deleteItem",
  async (productId, { rejectWithValue }) => {
    try {
      return await deleteCartItem(productId);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: 0,
    totalItems: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },

    setCart: (state, action) => {
      const cart = action.payload;

      if (!cart) {
        state.items = [];
        state.totalItems = 0;
        state.totalPrice = 0;
        return;
      }

      state.items = cart.items || [];
      state.totalItems = cart.totalItems || 0;
      state.totalPrice = cart.totalPrice || 0;
    },
  },

  extraReducers: (Builder) => {
    Builder.addCase(fetchCart.pending, (state) => {
      state.loading = true;
    })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload) {
          state.items = [];
          state.totalItems = 0;
          state.totalPrice = 0;
          return;
        }

        state.items = action.payload.items || [];
        state.totalItems = action.payload.totalItems || 0;
        state.totalPrice = action.payload.totalPrice || 0;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addItem.fulfilled, (state, action) => {
        //console.log("Add item fulfilled with payload:", action.payload);
        if (!action.payload) return;
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
        state.totalItems = action.payload.totalItems;
      })

      .addCase(updateItem.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
        state.totalItems = action.payload.totalItems;
      })

      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
        state.totalItems = action.payload.totalItems;
      });
  },
});

export const { clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
