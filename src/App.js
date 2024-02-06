import { Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";

function App() {
  return (
    <div className="App">
      App
      <Link to="about">点我跳转到简介路由</Link>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="about" element={<About/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
