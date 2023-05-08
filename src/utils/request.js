import axios from 'axios'

import { Notification } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

const token = localStorage.getItem("authToken")

const instance = axios.create({
  baseURL: '/api', //实际跨域地址写在vue.config.js即可
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'authToken': token
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
    case 1000:
      return response.data
    default:
      Notification({
        message: response.data.msg,
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
