import { createSlice } from "@reduxjs/toolkit";
import { setToken as _setToken, getToken, removeToken, request } from "@/utils";
import { loginAPI, getProfileAPI } from "@/apis/user";

const userStore = createSlice({
  name: "user",
  // 初值
  initialState: {
    token: getToken() || "",
    userInfo: {},
  },
  // 同步修改方法
  reducers: {
    setToken(state, actions) {
      state.token = actions.payload;
      _setToken(actions.payload);
    },
    setUserInfo(state, actions) {
      state.userInfo = actions.payload;
    },
    clearUserInfo(state) {
      state.token = "";
      state.userInfo = {};
      removeToken();
    },
  },
});
// 异步方法 完成登录获取token
// 1.发送异步请求 2.提交同步action进行token的存入
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    // const res = await request.post("/authorizations", loginForm);
    const res = await loginAPI(loginForm);
    dispatch(setToken(res.data.token));
  };
};
const fetchUserInfo = () => {
  return async (dispatch) => {
    // const res = await request.get("/user/profile");
    const res = await getProfileAPI();
    dispatch(setUserInfo(res.data));
  };
};

const { setToken, setUserInfo, clearUserInfo } = userStore.actions; // 解构出actionCreater

const userReducer = userStore.reducer;
export { setToken, fetchLogin, fetchUserInfo, clearUserInfo };
export default userReducer;
