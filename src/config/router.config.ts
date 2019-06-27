import { UserLayout } from '@/layouts';

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/components/HelloWorld.vue'),
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
