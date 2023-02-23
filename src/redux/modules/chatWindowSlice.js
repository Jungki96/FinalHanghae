import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  messages: [],
  isLoading: false,
  error: null,
  isLogin: false,
};

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get("/chat/room");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (payload, thunkAPI) => {
    const { message } = payload;
    try {
      await axios.post("http://localhost:8080/app/chat", { message });
      return thunkAPI.fulfillWithValue(message);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const chattingSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMessages.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchMessages.fulfilled]: (state, action) => {
      state.loading = false;
      state.messages = action.payload;
    },
    [fetchMessages.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [sendMessage.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [sendMessage.fulfilled]: (state, action) => {
      state.loading = false;
      state.messages = [...state.messages, action.payload];
    },
    [sendMessage.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default chattingSlice.reducer;
