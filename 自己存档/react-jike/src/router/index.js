// 路由配置
import Layout from "../pages/Layout";
import Login from "@/pages/Login";
import { createBrowserRouter } from "react-router-dom";
import AuthRoute from "@/components/AuthRoute";

// 1.lazy函数进行懒加载
import { Suspense, lazy } from "react";
const Home = lazy(()=>import("@/pages/Home"))
const Article = lazy(()=>import("@/pages/Article"))
const Publish = lazy(()=>import("@/pages/Publish"))

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <Layout></Layout>
      </AuthRoute>
    ),
    children:[
      {
        // path:'home',
        index:true,
        element:<Suspense fallback={'加载中'}><Home/></Suspense>
      },
      {
        path:'article',
        element:<Suspense fallback={'加载中'}><Article/></Suspense>
      },
      {
        path:'publish',
        element:<Suspense fallback={'加载中'}><Publish/></Suspense>
      },
    ]
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);

export default router;
