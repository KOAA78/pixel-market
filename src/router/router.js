/*
 * @Descripttion: 
 * @Author: Rui Lin
 * @Date: 2023-05-06 08:23:24
 */
import VueRouter from 'vue-router';
import basicRoutes from './basic-routes';
import managementRoutes from './management-routes';
import messageRoutes from './message-routes';
import merchandiseRoutes from './merchandise-router';

import { Notification } from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

const routes = [
    ...basicRoutes,
    ...managementRoutes,
    ...messageRoutes,
    ...merchandiseRoutes
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

// FIXME: 全局路由守卫
// router.beforeEach((to, from, next) => {
//     const isLoggedIn = localStorage.getItem('authToken')
//     // 如果用户已登录（或者前往的是登录或注册页面），则允许访问
//     if (isLoggedIn || to.name === 'login' || to.name === 'signin') {
//         next();
//     } else {
//         // 否则跳转到登录页面
//         Notification({   
//             message: '请先登录',
//             offset: 115,
//             type: 'warning',
//             duration: 2000
//           })
//         next('/login');
//     }
// })

export default router