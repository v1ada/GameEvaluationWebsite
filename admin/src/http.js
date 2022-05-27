import Vue from 'vue';
import router from './routes/router';
import axios from 'axios';

// 设置http基础路径
const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/admin/api',
});
// axios请求拦截器
http.interceptors.request.use(
  // 请求头添加 Authorization
  (config) => {
    if (localStorage.token) config.headers.Authorization = `Bearer ${localStorage.token}`;
    return config;
  },
  (err) => Promise.reject(err)
);
// axios响应拦截器
http.interceptors.response.use(
  // 响应返回成功操作
  (res) => {
    return res;
  },
  // 响应失败的操作
  (err) => {
    // 有err的响应message时
    if (err.response.data.message) {
      // Vue 显示message
      Vue.prototype.$message({
        type: 'error',
        message: err.response.data.message,
      });
      // 如果返回状态码401 说明没有登录，返回登录页
      if (err.response.status === 401) router.push('/login');
    }
    return Promise.reject(err);
  }
);

export default http;
