import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchChannelList } from "./store/module/channelStore";

function App() {
  const dispatch = useDispatch(); // 得到dispatch函数
  let {channelList} = useSelector((state)=>state.channel)
  console.log(channelList,'channelList');
  useEffect(() => {
    dispatch(fetchChannelList());
  }, [dispatch]);
  const setchannels = () => {};
  return (
    <div className="App">
      <button onClick={setchannels}>异步发送请求</button>
      <ul>{channelList.map(item=><li key={item.id}>{item.name}</li>)}</ul>
    </div>
  );
}

export default App;
