import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;
const initialState = {
  userList: [
    {
      email: "",
      password: "",
      username: "",
    },
  ],
  isLoading: false,
  error: null,
  isLogin: false,
};

//로그인 POST요청

export const __postLogin = createAsyncThunk("login", async (payload, thunkAPI) => {
  console.log(payload);
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_DOG}/users/login`,
      // "http://54.85.166.118/users/login",
      payload
    );

    sessionStorage.setItem("accessToken", res.headers.authorization);
    // sessionStorage.setItem("refresh_token", res.headers.authorization);
    console.log(res);
    return thunkAPI.fulfillWithValue();
  } catch (error) {
    console.log(error);
    if (400 < error.status < 500) {
      alert(error.response.data.message);
    }
    return thunkAPI.rejectWithValue(error);
  }
});

//회원가입 post 요청

export const __postUser = createAsyncThunk("signup", async (payload, thunkAPI) => {
  try {
    console.log(payload);
    const { data } = await axios.post("https://midcon.shop/users/signup", payload);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    if (400 < error.status < 500) {
      alert(error.response.data.message);
    }
    return thunkAPI.rejectWithValue(error);
  }
});
//이메일 중복체크
export const __checkId = createAsyncThunk("account/checkId", async (payload, thunkAPI) => {
  try {
    const { data } = await axios.post("https://midcon.shop/users/dupcheck", payload, {
      withCredentials: true,
    });
    console.log(data);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    if (400 < error.status < 500) {
      alert(error.response.data.message);
    }
    return thunkAPI.rejectWithValue(error);
  }
});

const userList = createSlice({
  name: "userList",
  initialState,
  reducers: {},
  extraReducers: {
    //post
    [__postUser.pending]: (state) => {
      //보내는 도중, 진행중
      state.isLoading = true;
    },
    [__postUser.fulfilled]: (state, action) => {
      //연결후
      state.isLoading = false;
    },
    [__postUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }, //post

    [__checkId.pending]: (state) => {
      //보내는 도중, 진행중
      state.isLoading = true;
    },

    [__checkId.fulfilled]: (state, action) => {
      //연결후
      state.isLoading = false;

      alert("사용가능 이메일입니다! 이메일인증을 진행해주세요!");
    },
    [__checkId.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }, //post
    [__postLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [__postLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isLogin = true;
    },
    [__postLogin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export default userList.reducer;
