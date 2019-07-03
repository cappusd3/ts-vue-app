// ie polyfill
// import '@babel/polyfill'

import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import i18n from './i18n';

// import Storage from 'vue-ls';
// const options = {
//   namespace: 'vuejs__', // key prefix
//   name: 'ls', // name variable Vue.[ls] or this.[$ls],
//   storage: 'local', // storage name session, local, memory
// };

// Vue.use(Storage, options);

// mock
import './mock';

// 全局引入 ant-desing-vue
// 包括样式
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';

import './permission';

Vue.config.productionTip = false;

Vue.use(Antd);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
