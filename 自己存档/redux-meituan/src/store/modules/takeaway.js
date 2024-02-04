// 编写store
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// 同步部分
const foodsStore = createSlice({
  name: "foods",
  initialState: {
    foodsList: [], // 商品列表
    activeIndex: 0, // 菜单激活下标值
    cartList: [], // 购物车列表
  },
  reducers: {
    setFoodList(state, actions) {
      state.foodsList = actions.payload;
    },
    changeActiveIndex(state, actions) {
      state.activeIndex = actions.payload;
    },
    addCart(state, actions) {
      // 以id匹配来判断是否已经添加过
      const item = state.cartList.find(
        (item) => item.id === actions.payload.id
      );
      if (item) item.count++;
      else state.cartList.push(actions.payload);
    },
    // count增减
    increCount(state, actions) {
      const item = state.cartList.find(
        (item) => item.id === actions.payload.id
      );
      item.count++;
    },
    decreCount(state, actions) {
      const item = state.cartList.find(
        (item) => item.id === actions.payload.id
      );
      item.count--;
      console.log(state.cartList,'cartList');
      if (item.count === 0) {
        const index = state.cartList.findIndex(item=>item.id === actions.payload.id)
        state.cartList.splice(index,1)
      };
    },
    clearCart(state) {
      state.cartList = [];
    },
  },
});

const {
  setFoodList,
  changeActiveIndex,
  addCart,
  increCount,
  decreCount,
  clearCart,
} = foodsStore.actions;
const foodsReducer = foodsStore.reducer;
// 异步获取部分
const fetchFoodsList = () => {
  // 返回一个回调函数
  return async (dispatch) => {
    // 编写异步逻辑
    const res = await axios.get("http://localhost:3004/takeaway");
    // 调用dispatch函数提交action
    dispatch(setFoodList(res.data)); // 调用的时候要把参数传进去
  };
};

export {
  fetchFoodsList,
  changeActiveIndex,
  addCart,
  increCount,
  decreCount,
  clearCart,
};
export default foodsReducer;
