/*
 * @Descripttion: 
 * @Author: Rui Lin
 * @Date: 2023-05-31 01:24:07
 */
const basicRoutes = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('@/views/basic/signin'),
    meta: {
      title: '用户注册'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/basic/login'),
    meta: {
      title: '用户登录'
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/basic/profile'),
    meta: {
      title: '个人中心'
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin/ManagementPlatform'),
    meta: {
      title: '后台'
    }
  },
];

export default basicRoutes;