import Cookies from 'js-cookie';
import {
  SIDEBAR_TYPE,
  DEFAULT_FIXED_SIDEMENU,
 } from '../mutation-types';

const app = {
  namespaced: true,
  state: {
    // 中英文
    language: Cookies.get('language') || 'zh',
    sidebar: true,
    fixSiderbar: false
  },
  mutations: {
    SET_LANGUAGE: (state: any, language: string) => {
      state.language = language;
      Cookies.set('language', language);
    },
    SET_SIDEBAR_TYPE: (state: any, type: string) => {
      state.sidebar = type;
      localStorage.setItem(SIDEBAR_TYPE, type);
    },
    TOGGLE_FIXED_SIDERBAR: (state: any, fixed: string) => {
      localStorage.setItem(DEFAULT_FIXED_SIDEMENU, fixed);
      state.fixSiderbar = fixed;
    }
  },
  actions: {
    setLanguage({ commit }: any, language: string) {
      commit('SET_LANGUAGE', language);
    },
    setSideBar({ commit }: any, type: boolean) {
      commit('SET_SIDEBAR_TYPE', type)
    },
    ToggleFixSiderbar({ commit }: any, fixSiderbar: boolean) {
      commit('TOGGLE_FIXED_SIDERBAR', fixSiderbar)
    },
  },
};

export default app;
