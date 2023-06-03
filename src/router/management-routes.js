/*
 * @Descripttion: 
 * @Author: Rui Lin
 * @Date: 2023-05-31 01:29:45
 */
const managementRoutes = [
    {
        path: '/favor',
        name: 'favor',
        component: () => import('@/views/management/FavoriteFolder'),
        meta: {
            title: '已收藏的'
        }
    },
    {
        path: '/published',
        name: 'published',
        component: () => import('@/views/management/PublishedFolder'),
        meta: {
            title: '已发布的'
        }
    },
    {
        path: '/sold',
        name: 'sold',
        component: () => import('../views/management/SoldFolder.vue'),
        meta: {
            title: '已卖出的'
        }
    },
    {
        path: '/bought',
        name: 'bought',
        component: () => import('../views/management/BoughtFolder.vue'),
        meta: {
            title: '已买到的'
        }
    },
  ];
  
  export default managementRoutes;
  