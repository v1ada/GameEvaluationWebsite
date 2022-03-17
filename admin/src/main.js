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
