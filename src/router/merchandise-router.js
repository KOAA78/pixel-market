const merchandiseRoutes = [
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/merchandise/home'),
        meta: {
            title: '主页'
        }
    },
    {
        path: '/issue',
        name: 'issue',
        component: () => import('@/views/merchandise/issue'),
        meta: {
            title: '发布商品'
        }
    },
    {
        path: '/details/:mid',
        name: 'details',
        component: () => import('@/views/merchandise/details'),
        meta: {
            title: '商品详情'
        }
    },

];

export default merchandiseRoutes;
