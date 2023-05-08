/*
 * @Descripttion: 
 * @Author: Rui Lin
 * @Date: 2023-05-06 08:23:24
 */
import VueRouter from 'vue-router'

import { Notification } from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

const routes = [
    {
        path: '/',
        redirect: 'login'
    },
    {
        path: '/signin',
        name: 'signin',
        component: () => import('../views/signin'),
        meta: {
            title: '用户注册'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login'),
        meta: {
            title: '用户登录'
        }
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/home'),
        meta: {
            title: '主页'
        }
    },
    {
        path: '/message',
        name: 'message',
        component: () => import('../views/message'),
        meta: {
            title: '消息'
        }
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/profile'),
        meta: {
            title: '个人中心'
        }
    },

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