/*
 * @Descripttion: 
 * @Author: Rui Lin
 * @Date: 2023-05-18 08:23:24
 * @Note: Vuex 的状态是保存在内存中的，不是在浏览器的 URL 中。
 *        如果不是通过 Vue Router 或其他方式进行导航
 *        而通过手动修改网址框中的路径进行跳转，
 *        那么浏览器会加载新的页面，
 *        Vue 实例和 Vuex 的状态会被重置。
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token:"",
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    }
  },
  actions: {
    updateToken({ commit }, token) {
      commit('setToken', token);
    }
  },
  getters: {
    getToken: state => state.token
  }

})
export default store