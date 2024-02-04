import { createSlice } from "@reduxjs/toolkit";

// 创建store
const counterStore = createSlice({
  name: "counter",
  // 初始状态数据
  initialState: {
    count: 0,
  },
  //   修改状态的方法 同步方法 支持直接修改
  reducers: {
    increment(state,action) {
      state.count += action.payload;
    },
    decrement(state) {
      state.count--;
    },
  },
});

// 解构出创建action对象的函数
const { increment, decrement } = counterStore.actions;
// 获取reducer函数
const counterReducer = counterStore.reducer;
// 导出创建action对象的函数和reducer函数
export { increment, decrement };
export default counterReducer;
