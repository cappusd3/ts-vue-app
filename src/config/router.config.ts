import { UserLayout, BasicLayout, RouteView } from '@/layouts';

export const asyncRouteMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/workplace',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: '仪表盘', keepAlive: true, icon: 'compass' },
        children: [
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace.vue'),
            meta: { title: '工作台', keepAlive: true }
          },
          {
            path: '/dashboard/analysis',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Workplace.vue'),
            meta: { title: '分析页', keepAlive:  false }
          }
        ]
      },
      {
        path: '/dashboard2',
        name: 'dashboard2',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: '仪表盘2', keepAlive: true, icon: 'compass' },
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/components/HelloWorld.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue'),
  },
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/user/Login.vue'),
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/exception/404.vue'),
  },
]
