import Vue from 'vue';
import Router from 'vue-router';
import { constantRouterMap } from '@/config/router.config'

Vue.use(Router);

const routers = [...constantRouterMap];
export default new Router({
  routes: routers,
})

// export default new VueRouter({
//   mode: 'history',
//   base: __dirname,
//   scrollBehavior,
//   routes: [
//     { path: '/', component: Home, meta: { scrollToTop: true }},
//     { path: '/foo', component: Foo },
//     { path: '/bar', component: Bar, meta: { scrollToTop: true }}
//   ]
// })

// scrollBehavior:
// - only available in html5 history mode
// - defaults to no scroll behavior
// - return false to prevent scroll
