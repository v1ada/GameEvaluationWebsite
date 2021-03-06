import Vue from 'vue';
import Vuex from 'vuex';
// import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  state() {
    return {
      userData: {},
      loginState: false,
      gamesListData: [],
      gamesListDataTotal: 0,
      gamesListPage: 1,
      filter: {
        platform: [],
        type: [],
        sort: 'scoreDesc',
      },
    };
  },
  getters: {},
  mutations: {
    changeUserData(state, payload) {
      if (!payload) state.loginState = false;
      else {
        state.loginState = true;
        state.userData = payload;
      }
    },
    // 存储游戏列表数据
    changeGamesListData(state, payload) {
      state.gamesListData = payload.result;
      state.gamesListDataTotal = payload.total;
    },
    // 改变游戏列表分页
    changeGamesListPage(state, payload) {
      state.gamesListPage = payload.num;
    },
    // 存储游戏筛选条件
    changeFilter(state, payload) {
      state.filter = payload;
    },
  },
  actions: {
    // 发送异步axios请求，获取游戏列表数据
    async getGamesListData(context, payload) {
      try {
        // 游戏筛选条件
        const filter = context.state.filter;
        // 请求url路径
        let url = `/rest/gameInfo?page=${payload.page || 1}&sort=${filter.sort}`;
        // 判断非必要筛选条件，若存在 添加到url
        if (filter.platform.length) url += `&platform=${filter.platform}`;
        if (filter.type.length) url += `&type=${filter.type}`;
        // 发起请求，将获取的游戏列表数据存储到state中
        const { data } = await Vue.prototype.$http.get(url);
        context.commit('changeGamesListData', data);
      } catch (err) {
        console.log(err);
      }
    },
    // 模糊查询游戏
    async searchGameResult(context, payload) {
      context.commit('changeGamesListData', payload);
    },
  },
});

export default store;
