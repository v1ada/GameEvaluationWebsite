import Vue from 'vue';
import App from './App.vue';
import router from './routes/router';
import http from './http';

import './plugins/element.js'; // ElementUI

// 阻止显示生产模式提醒
Vue.config.productionTip = false;

// 全局使用设置好的axios
Vue.prototype.$http = http;

// 全局vue实例，都包含
Vue.mixin({
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`,
      };
    },
  },
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
