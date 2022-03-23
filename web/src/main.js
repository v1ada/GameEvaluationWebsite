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

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/admin/api',
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
