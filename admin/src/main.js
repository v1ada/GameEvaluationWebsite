import Vue from 'vue';
import App from './App.vue';
import router from './routes/router';
import axios from 'axios';

import './plugins/element.js';

Vue.config.productionTip = false;

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api',
});

http.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    // console.log(err.response.data.message);
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
  render: (h) => h(App),
}).$mount('#app');
