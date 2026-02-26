import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice.js";
import cartReducer from "./cartSlice.js";
import ordersReducer from "./orderSlice.js";
import profileReducer from "./profileSlice.js";
import chatReducer from "./chatSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    orders: ordersReducer,
    profile: profileReducer,
    chat: chatReducer,
  },
});
