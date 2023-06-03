/*
 * @Descripttion: 
 * @Author: Rui Lin
 * @Date: 2023-05-06 08:23:24
 */
import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'
import api from './apis/api.js'

import VueRouter from 'vue-router'
import router from './router/router'

import vuetify from './plugins/vuetify' //首字母V改小写（原理待研究
import VuetifyDialog from 'vuetify-dialog'
import 'vuetify-dialog/dist/vuetify-dialog.css'
import { Notification } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Vconsole from "vconsole";

import store from './store/index.js'


//开发环境使用，生产环境取消
// if (process.env.NODE_ENV == "development") {
//   new Vconsole();
// }

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$notify = Notification;

Vue.use(VueAxios, axios)
Vue.use(VueRouter)
Vue.use(vuetify)
Vue.use(VuetifyDialog, {
  context: {
    vuetify
  }
})

new Vue({
  render: h => h(App),
  router,
  axios,
  vuetify,
  store
}).$mount('#app')
