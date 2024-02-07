import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BillStore = createSlice({
  name: "BillStore",
  // 数据状态state
  initialState: {
    billList: [],
  },
  reducers: {
    // 同步修改方法
    setBillList(state, action) {
      state.billList = action.payload;
    },
    // 添加账单
    addBill(state, action) {
      state.billList.push(action.payload);
    },
  },
});

// 解构出方法
const { setBillList, addBill } = BillStore.actions;
// 异步请求
const getBillList = () => {
  return async (dispatch) => {
    // 1.编写异步请求
    const res = await axios.get("http://localhost:8888/ka");
    // 2.触发同步reducer
    dispatch(setBillList(res.data));
  };
};
const addBillList = (data) => {
  return async (dispatch) => {
    // 1.编写异步请求
    const res = await axios.post("http://localhost:8888/ka", data);
    // 2.触发同步reducer
    dispatch(addBill(res.data));
  };
};
export { getBillList, addBillList };
// 导出reducer
const reducer = BillStore.reducer;
export default reducer;
