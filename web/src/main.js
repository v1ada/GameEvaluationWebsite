import Vue from 'vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/icon/iconfont/iconfont.css';

import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

Vue.use(ElementUI);

Vue.config.productionTip = false;

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
Vue.prototype.$http = http;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
