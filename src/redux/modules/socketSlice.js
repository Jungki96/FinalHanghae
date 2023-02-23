import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  socket: [],
  messages: [],
  isLoading: false,
  error: null,
};

const config = {
  headers: {
    Authorization: localStorage.getItem("token"),
  },
};

//메시지 불러오기
export const getMessage = createAsyncThunk(
  "get/chat",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(``, {});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//채팅방 전체 불러오기
export const getChatRoom = createAsyncThunk(
  "get/chatroom",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get("", {});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    subMessage(state, action) {
      state.messages.push(action.payload);
      //새로 고침이 될때 2개씩 보내짐 이거 고쳐야함
      // state.messages = action.payload;
    },
  },
  extraReducers: {
    // [addChatroom.fulfilled]: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.chat = payload;
    // },
    [getMessage.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.messages = payload;
    },
    // [getChatRoom.fulfilled]: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.chatRoom = payload;
    // },
    // [memberInfo.fulfilled]: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.users = payload;
    // },
  },
});

export const { subMessage } = socketSlice.actions;
export default socketSlice.reducer;
