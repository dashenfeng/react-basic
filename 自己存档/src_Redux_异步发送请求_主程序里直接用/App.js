import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setChannels } from "./store/module/channelStore";
import axios from "axios";

function App() {
  const dispatch = useDispatch(); // 得到dispatch函数
  let { channelList } = useSelector((state) => state.channel);
  // useEffect里处理自动发送请求操作
  useEffect(() => {
    const URL = "http://geek.itheima.net/v1_0/channels";
    const fetchChannelList = () => {
      return async (dispatch) => {
        const res = await axios.get(URL);
        dispatch(setChannels(res.data.data.channels));
      };
    };

    // const result = fetchChannelList()
    // result(dispatch)
    fetchChannelList()(dispatch)
  }, [dispatch]);
  return (
    <div className="App">
      <ul>
        {channelList.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
