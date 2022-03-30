import Vue from 'vue';
import App from './App.vue';
import router from './routes/router';
import axios from 'axios';

import './plugins/element.js'; // ElementUI

Vue.config.productionTip = false; // 阻止显示生产模式提醒

// 设置http基础路径
const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api',
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
    if (err.response.data.message) {
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
// 全局使用设置好的axios
Vue.prototype.$http = http;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
