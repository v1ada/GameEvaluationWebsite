import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '@/views/Login';
import Main from '@/views/Main';
import ListArticle from '@/views/News/ListArticle';
import CreateArticle from '@/views/News/CreateArticle';
import EditArticle from '@/views/News/EditArticle';
import ListAdmin from '@/views/Users/ListUser';

Vue.use(VueRouter);
const routes = [
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/articles/list',
        name: 'ListArticle',
        component: ListArticle,
      },
      {
        path: '/articles/create',
        name: 'CreateArticle',
        component: CreateArticle,
      },
      {
        path: '/articles/edit/:id',
        name: 'EditArticle',
        component: EditArticle,
      },
      { path: '/users/list', name: 'ListAdmin', component: ListAdmin },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
