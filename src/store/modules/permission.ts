import { asyncRouteMap, constantRouterMap } from '@/config/router.config';

const permission = {
  namespaced: true,

  state: {
    routers: constantRouterMap,
    addRouters: []
  },

  mutations: {
    SET_ROUTES: (state: any, routers: []) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({ commit }: any, data: any) {
      return new Promise((resolve) => {
        // const { roles } = data;
        console.log('GenerateRoutes')
        commit('SET_ROUTES', asyncRouteMap);
        resolve()
      })
    }
  },
}

export default permission;
