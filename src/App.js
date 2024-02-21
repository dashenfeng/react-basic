import React, { useEffect } from "react";
import { create } from "zustand";

const createCounterStore = (set) => {
  return {
    count: 0,
    ins: () => {
      return set((state) => ({ count: state.count + 1 }));
    },
  };
};

const URL = "http://geek.itheima.net/v1_0/channels";
const createChannelStore = (set) => {
  return {
    channelList: [],
    // 异步编写代码：直接在函数中编写异步逻辑,最后只要调用set方法传入新数据即可
    fetchChannelList: async () => {
      const res = await fetch(URL);
      const jsonData = await res.json();
      set({ channelList: jsonData.data.channels });
    },
  };
};

// 语法要求，把参数a也传下去
const useStore = create((...a) => {
  return {
    ...createCounterStore(...a),
    ...createChannelStore(...a)
  };
});
function App() {
  const { count, ins, fetchChannelList, channelList } = useStore(); //解构出数据和方法
  useEffect(() => {
    fetchChannelList();
  }, [fetchChannelList]);
  return (
    <div>
      <span>{count}</span>
      <ul>
        {channelList.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <button onClick={ins}>one up</button>
    </div>
  );
}

export default App;
