import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllChats,
  fetchChat,
  SendAdminMessage,
  SendUserMessage,
} from "../services/chatService";

export const loadChat = createAsyncThunk(
  "chat/laodChat",
  async (userId, { rejectWithValue }) => {
    try {
      //console.log("thunk:", userId);
      return await fetchChat(userId);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const loadAllChat = createAsyncThunk(
  "chat/loadAllChat",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAllChats();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const sendUserMessage = createAsyncThunk(
  "chat/sendUserMessage",
  async (message, { rejectWithValue }) => {
    try {
      return await SendUserMessage(message);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const sendAdminMessage = createAsyncThunk(
  "chat/sendAdminMessage",
  async ({ userId, message }, { rejectWithValue }) => {
    try {
      return await SendAdminMessage(userId, message);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    message: [],
    chats: [],
    loading: false,
    error: null,
  },
  reducers: {
    messageReceived: (state, action) => {
      state.message.push(action.payload);
    },
  },
  extraReducers: (Builder) => {
    Builder.addCase(loadChat.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
      .addCase(loadChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadChat.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })

      .addCase(loadAllChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadAllChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadAllChat.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = action.payload;
      })

      .addCase(sendAdminMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendAdminMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendAdminMessage.fulfilled, (state, action) => {
        state.loading = false;
      })

      .addCase(sendUserMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendUserMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendUserMessage.fulfilled, (state, action) => {
        state.loading = false;
      });
  },
});

export const { messageReceived } = chatSlice.actions;
export default chatSlice.reducer;
