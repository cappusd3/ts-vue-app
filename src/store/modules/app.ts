import Cookies from 'js-cookie';

const app = {
  namespaced: true,
  state: {
    // 中英文
    language: Cookies.get('language') || 'zh',
  },
  mutations: {
    SET_LANGUAGE: (state: any, language: string) => {
      state.language = language;
      Cookies.set('language', language);
    },
  },
  actions: {
    setLanguage({ commit }: any, language: string) {
      commit('SET_LANGUAGE', language);
    },
  },
};

export default app;
