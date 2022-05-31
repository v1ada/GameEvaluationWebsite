import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import News from '@/components/News-card.vue';
import NewDetail from '@/views/New/NewDetail.vue';
import GameLibrary from '@/views/Game/GameLibrary.vue';
import GameDetail from '@/views/Game/GameDetail.vue';
import Login from '@/views/User/Login.vue';
import Register from '@/views/User/Register.vue';
import UserData from '@/views/User/UserData.vue';
import UpdatePassword from '@/views/User/UpdatePassword.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/userData/:id',
    name: 'UserData',
    component: UserData,
    meta: { isPrivate: true },
  },
  {
    path: '/updatePassword/:id',
    name: 'UpdatePassword',
    component: UpdatePassword,
    meta: { isPrivate: true },
  },
  {
    path: '/news',
    name: 'News',
    component: News,
  },
  {
    path: '/new/:id',
    name: 'NewDetail',
    component: NewDetail,
  },
  {
    path: '/game/library',
    name: 'GameLibrary',
    component: GameLibrary,
  },
  {
    path: '/game/library/:platform',
    name: 'GameLibraryPlatform',
    component: GameLibrary,
  },
  {
    path: '/game/:id',
    name: 'GameDetail',
    component: GameDetail,
  },
  {
    path: '*', // 其他路由
    redirect: '/',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// 没有登录token不能进入
router.beforeEach(async (to, from, next) => {
  if (to.meta.isPrivate) {
    if (localStorage.token) await Vue.prototype.$http.get(`/checkLogin`);
    if (!localStorage.token) next('/login');
  }
  next();
});

export default router;
