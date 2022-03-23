import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state() {
    return {
      name: '张三',
      number: 0,
      list: [
        { id: 1, name: '111' },
        { id: 2, name: '222' },
        { id: 3, name: '333' },
      ],
    };
  },
});

export default store;
