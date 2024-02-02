import { useState } from "react";

// 封装一个自定义hook
function useToggle() {
  const [value, setValue] = useState(true);
  const toggle = () => setValue(!value);
  // 把想要复用的的东西导出
  return {
    value,
    toggle,
  };
}

function App() {
  const { value, toggle } = useToggle(true); // 解构出来

  return (
    <div className="App">
      {value && <div>123</div>}
      <button onClick={toggle}>toggle</button>
    </div>
  );
}

export default App;
