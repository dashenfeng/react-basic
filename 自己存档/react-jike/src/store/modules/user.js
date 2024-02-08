import { createSlice } from "@reduxjs/toolkit";
import { setToken as _setToken,getToken, request } from "@/utils";

const userStore = createSlice({
  name: "user",
  // 初值
  initialState: {
    token: getToken() || "",
  },
  // 同步修改方法
  reducers: {
    setToken(state, actions) {
      state.token = actions.payload;
      _setToken(actions.payload)
    },
  },
});
// 异步方法 完成登录获取token
// 1.发送异步请求 2.提交同步action进行token的存入
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await request.post("/authorizations", loginForm);
    dispatch(setToken(res.data.token));
  };
};

const { setToken } = userStore.actions; // 解构出actionCreater

const userReducer = userStore.reducer;
export { setToken, fetchLogin };
export default userReducer;
