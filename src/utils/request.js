/*
 * @Descripttion: 
 * @Author: Rui Lin
 * @Date: 2023-05-06 08:23:24
 */
import axios from 'axios'
import store from '../store/index.js';

import { Notification } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// const token = localStorage.getItem("token")
const token = store.state.token

const instance = axios.create({
  baseURL: '/api', //实际跨域地址写在vue.config.js即可
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'AuthToken': token
  }
})

// 请求拦截器
instance.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})


instance.interceptors.response.use(response => {
  let code = response.data.code;
  switch (code) {
    case 0:
      return response.data
    default:
      Notification({
        message: response.data.message,
        offset: 115,
        type: 'warning',
        duration: 2000
      })
  }
},
  error => {
    let code = error.code
    switch (code) {
      default:
        Notification({
          message: "网络错误",
          offset: 115,
          type: 'warning',
          duration: 2000
        })
    }    
    return Promise.reject(error)
  })

export default instance
