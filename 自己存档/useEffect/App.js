import { useEffect, useState } from "react";

const Son = () => {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log("interval is running...");
    }, 1000);
    return () => {
      // 清除副作用(组件卸载时会调用return)
      clearInterval(timer);
    };
  }, []);
  return <div>This is Son</div>;
};
function App() {
  const [show, setShow] = useState(true);
  return (
    <div className="App">
      {show && <Son />}
      <button onClick={() => setShow(false)}>卸载Son</button>
    </div>
  );
}

export default App;
