import Login from "../page/Login";
import Article from "../page/Article";
import Layout from "../page/Layout";
import Board from "../page/Board";
import About from "../page/About";
import NotFound from "../page/NotFound";
import { createBrowserRouter } from "react-router-dom";

// 创建router实例对象并且配置路由对应关系
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        // 设置默认二级路由，一级路由访问时，他也能得到渲染
        // path: "board",
        index: true, // 默认二级路由，设置index，取消path
        element: <Board />,
      },
      {
        path: "About", //子路由这里不用「/」
        element: <About />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/article/:id/:name",
    element: <Article />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
