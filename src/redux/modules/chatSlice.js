import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const accessToken = localStorage.getItem("authorization");
const refreshToken = localStorage.getItem("refresh-Token");

const initialState = {
  roomId: "",
  chatRoom: [
    {
      id: "",
      name: "",
    },
  ],
  chat: [],
  users: [
    {
      memberId: 0,
      loginId: "",
      nickName: "",
      password: "",
      phoneNumber: "",
    },
  ],
  isLoading: false,
  error: null,
};

//유저 상세 검색
export const memberInfo = createAsyncThunk(
  "get/memberinfo",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://jossiya.shop/api/member/memberInfo",
        {
          headers: {
            contentType: "application/json",
            authorization: accessToken,
            "refresh-Token": refreshToken,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//채팅방 생성
export const addChatroom = createAsyncThunk(
  "post/chatroom",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/chat/room", payload, {
        headers: {
          contentType: "application/json",
          authorization: accessToken,
          "refresh-Token": refreshToken,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//메시지 불러오기
export const getMessage = createAsyncThunk(
  "get/chat",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://jossiya.shop/api/${payload}/messages`,
        {
          headers: {
            contentType: "application/json",
            authorization: accessToken,
            "refresh-Token": refreshToken,
          },
        }
      );
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
      const response = await axios.get("/chat/rooms", {
        headers: {
          contentType: "application/json",
          authorization: accessToken,
          "refresh-Token": refreshToken,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      state.chat = [...state.chat, payload];
    },
  },
  extraReducers: {
    [addChatroom.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.chat = payload;
    },
    [getMessage.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.chat = payload;
    },
    [getChatRoom.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.chatRoom = payload;
    },
    [memberInfo.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.users = payload;
    },
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
