import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state() {
    return {
      name: '张三',
      age: 0,
      from: 'china',
      list: [
        { id: 1, text: '111', done: true },
        { id: 2, text: '222', done: false },
        { id: 3, text: '333', done: true },
      ],
    };
  },
  getters: {
    listDone(state) {
      return state.list.filter((item) => item.done);
    },
    // 可以接受第二个参数，为其他getter
    listDoneCount(state, getters) {
      return getters.listDone.length;
    },
    // 带参数
    listFindById(state) {
      return (id) => {
        return state.list.find((item) => item.id === id);
      };
    },
  },
  mutations: {
    ageGrow(state) {
      state.age++;
    },
    // 带载荷
    ageGrowBy(state, payload) {
      state.age += payload.num;
    },
  },
  actions: {
    ageGrow(context) {
      context.commit('ageGrow');
    },
  },
});

export default store;
