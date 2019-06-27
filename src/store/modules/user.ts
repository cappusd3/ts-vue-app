import { login, logout } from '@/api/login'
import { AxiosResponse } from 'axios';

const user = {
  namespaced: true,

  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
  },

  mutations: {
    SET_TOKEN: (state: any, token: string) => {
      state.token = token;
    },
    SET_NAME: (state: any, { name, welcome }: any) => {
      state.name = name;
      state.welcome = welcome;
    },
    SET_AVATAR: (state: any, avatar: string) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state: any, roles: []) => {
      state.roles = roles;
    },
    SET_INFO: (state: any, info: object) => {
      state.info = info;
    },
  },

  actions: {
    // 登录
    Login({ commit }: any, userInfo: any) {
      return new Promise((resolve, reject) => {
        login(userInfo).then((response: AxiosResponse) => {
          if (response.status > 200) {
            reject(response);
          }
          const result = response.data;
          commit('SET_TOKEN', result.token);
          resolve();
        }).catch((error: Error) => {
          reject(error);
        })
      })
    },

    // 登出
    Logout({ commit, state }: any) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        // Vue.ls.remove(ACCESS_TOKEN)
        logout().then(() => {
          resolve();
        }).catch(() => {
          resolve();
        })
      })
    },
  },
}

export default user;
