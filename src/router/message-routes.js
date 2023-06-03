const messageRoutes = [
    {
        path: '/message',
        name: 'message',
        component: () => import('../views/message/message'),
        meta: {
            title: '消息'
        }
    },
    {
        path: '/chat/:recipient',
        name: 'chat',
        component: () => import('../views/message/chat'),
        meta: {
            title: '聊天'
        }
    },
  ];
  
  export default messageRoutes;
  