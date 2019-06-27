// ie polyfill
// import '@babel/polyfill'

import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import i18n from './i18n';

// mock
import './mock';

// 全局引入 ant-desing-vue
// 包括样式
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false;

Vue.use(Antd);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
