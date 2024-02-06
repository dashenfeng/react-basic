import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div>
      一级路由layout组件
      <br />
      <Link to="/about">跳转到about</Link>
      <br />
      <Link to="/login">跳转到login</Link>
      {/* Outlet配置二级路由出口 */}
      <Outlet />
    </div>
  );
}

export default Layout;
