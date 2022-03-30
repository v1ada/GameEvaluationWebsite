import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import News from '@/views/News.vue';
import NewDetail from '@/views/NewDetail.vue';
import GameLibrary from '@/views/GameLibrary.vue';
import GameDetail from '@/views/GameDetail.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';

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
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;