/**
 * 路由拦截，权限验证和菜单生成
 */

import Vue from 'Vue';
import router from './router';
import store from './store';

import { notification } from 'ant-design-vue';
import { ACCESS_TOKEN } from '@/store/mutation-types';
// 白名单
const whiteList: string[] = ['login', 'register'];

let flag: boolean = true;
router.beforeEach((to, from, next) => {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    // has token
    flag = false
    if (to.path === '/user/login') {
      next({ path: '/dashboard/workplace' });
    } else {
      // TODO: 这边可以通过 标志 flag, 或者 根据 store.getters.roles.length
      if (store.getters.roles.length === 0 && flag) {
        // 判断是否获取到菜单数据,并且只执行一次
        store.dispatch('permission/GenerateRoutes').then(() => {
          // TODO: 这里可以根据 roles 权限生成可访问的路由表
          // 动态添加可访问路由表
          router.addRoutes(store.getters.addRouters);
          // TODO: from.query.redirect || to.path 类型
          const url = (from.query.redirect || to.path) as string;
          const redirect = decodeURIComponent(url);
          if (to.path === redirect) {
            // TODO: hack ？？？
            next({ ...to, replace: true });
          } else {
            next({ path: redirect });
          }
        })
        .catch(() => {
          notification.error({
            message: '错误',
            description: '请求用户信息失败，请重试。'
          })
          store.dispatch('user/Logout').then(() => {
            next({ path: '/user/login', query: { redirect: to.fullPath } });
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.name || '')) {
      next();
    } else {
      next({ path: '/user/login', query: { redirect: to.fullPath } })
    }
  }
})
