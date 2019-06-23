<template>
  <div id="app">
    <a-locale-provider :locale="zh_CN">
      <!-- 这里需要包一层 div， 否则 router-view不显示 -->
      <div>
        <div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link>
        </div>
        <router-view />
      </div>
    </a-locale-provider>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue,
} from 'vue-property-decorator';
import { LocaleProvider } from 'ant-design-vue';
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
// import Loader from '@/components/Loader/index.vue';

@Component({
  components: {
    // loader: Loader,
    'a-locale-provider': LocaleProvider,
  },
})
export default class App extends Vue {
  private zh_CN = zh_CN;
}

// export default Vue.extend({
// })
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
