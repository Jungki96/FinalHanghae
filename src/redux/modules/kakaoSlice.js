import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;
const initialState = {
  kakaoList: {},
  isLoading: false,
  error: null,
  isLogin: false,
};

//로그인 POST요청
export const __kakaoLogin = createAsyncThunk(
  "login",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios
        .post(`https://midcon.shop/login/oauth/kakao`, payload, {
          withCredentials: true,
        })

        .then((res) => {
          const accessToken = res.headers.authorization;
          sessionStorage.setItem("accessToken", accessToken);
          console.log(res);
          return res;
        });
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const kakaoList = createSlice({
  name: "kakaoList",
  initialState,
  reducers: {},
  extraReducers: {
    [__kakaoLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [__kakaoLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isLogin = true;
    },
  },
});

export default kakaoList.reducer;
