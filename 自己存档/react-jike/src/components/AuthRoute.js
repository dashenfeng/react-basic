import { getToken } from "@/utils";
import React from "react";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const token = getToken();
  // 这里的children是一个组件
  if (token) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/login"} replace />;
  }
};

export default AuthRoute;
