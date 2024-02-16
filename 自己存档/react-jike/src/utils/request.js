import axios from "axios";
import { getToken, removeToken } from "./token";
import router from "@/router";
/* 
    axios封装处理:
        1.根域名配置
        2.超时时间
        3.请求/响应拦截器
*/
// 1.根域名配置
const request = axios.create({
  baseURL: "http://geek.itheima.net/v1_0",
  timeout: 5000,
});

// 2.添加请求拦截器(请求发送之前)
request.interceptors.request.use(
  (config) => {
    // 注入token数据
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3.添加响应拦截器(响应返回到客户端之前)
request.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // 监控401token失效
    if (error.response.status === 401) {
      removeToken()
      router.navigate('/login')
      window.location.reload()
    }
    return Promise.reject(error);
  }
);

export { request };
