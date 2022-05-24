import Vue from 'vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/icon/iconfont/iconfont.css';

import App from './App.vue';
import router from './routes/router';
import store from './store';
import http from './http';

Vue.use(ElementUI);

// 阻止显示生产模式提醒
Vue.config.productionTip = false;

// 全局使用设置好的axios
Vue.prototype.$http = http;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
