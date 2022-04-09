/* 静态页面路由 */
const staticRouter = [
  {
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/AppLogin')
  }, {
    path: '/register',
    name: 'register',
    component: () => import('@/views/login/AppRegister')
  }, {
    path: '/index',
    menu: true,
    name: 'layout',
    component: () => import('@/views/layout/TheLayout'),
    children: [
      {
        path: '/index',
        name: 'index',
        title: 'menu.home',
        icon: 'el-icon-s-home',
        component: () => import('@pages/PageHome')
      }, {
        path: '/table',
        name: 'table',
        title: 'menu.table',
        icon: 'el-icon-search',
        component: () => import('@pages/PageSelect')
      }, {
        path: '/charts',
        name: 'charts',
        title: 'menu.chart',
        icon: 'el-icon-picture',
        component: () => import('@pages/PageRecommend')
      },
      {
        path: '/score',
        name: 'score',
        title: 'menu.score',
        icon: 'el-icon-rank',
        component: () => import('@/views/pages/PageScore')
      },
      {
        path: '/drag',
        name: 'drag',
        title: 'menu.drag',
        icon: 'el-icon-rank',
        component: () => import('@pages/PageChoice')
      },
      {
        path: '/userInfo',
        name: 'userInfo',
        title: 'menu.userInfo',
        icon: 'el-icon-rank',
        component: () => import('@pages/user/UserInfo')
      },
      {
        path: '/learnInfo',
        name: 'learnInfo',
        title: 'menu.learnInfo',
        icon: 'el-icon-rank',
        component: () => import('@pages/LearnInfomation')
      }
    ]
  },
  {
    path: '/error/403',
    name: 'error403',
    component: () => import('@/views/error/AppError403')
  }, {
    path: '/error/500',
    name: 'error500',
    component: () => import('@/views/error/AppError500')
  }, {
    path: '*',
    name: 'error404',
    component: () => import('@/views/error/AppError404')
  }
]

export default staticRouter
