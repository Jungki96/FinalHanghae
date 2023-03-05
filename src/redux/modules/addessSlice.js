//강아지 정보입력 슬라이스
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;
const initialState = {
  addressInfo: [
    {
      latitude: 128.0,
      longitude: 35.0,
    },
  ],
  isLoading: false,
  error: null,
  isLogin: false,
};

//강아지 정보입력 post 요청

export const __patchAddress = createAsyncThunk(
  "address",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const Authorization = sessionStorage.getItem("accessToken");
      console.log(Authorization);
      const { data } = await axios.patch(
        `${process.env.REACT_APP_DOG}/users/mypage`,
        payload,
        {
          headers: {
            Authorization,
          },
        }
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const addressSlice = createSlice({
  name: "addressSlice",
  initialState,
  reducers: {},
  extraReducers: {
    //post
    [__patchAddress.pending]: (state) => {
      //보내는 도중, 진행중
      state.isLoading = true;
    },
    [__patchAddress.fulfilled]: (state, action) => {
      //연결후
      state.isLoading = false;
      alert("주소 기입이 완료 되셨습니다!");
    },
    [__patchAddress.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }, //post
  },
});
export default addressSlice.reducer;
