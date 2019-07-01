<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-locale-provider>
</template>

<script lang="ts">
import {
  Component, Vue,
} from 'vue-property-decorator';
import { LocaleProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
// import Loader from '@/components/Loader/index.vue';

@Component({
  components: {
    // loader: Loader,
    'a-locale-provider': LocaleProvider,
  },
})
export default class App extends Vue {
  private locale = zhCN;
}

// export default Vue.extend({
// })
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
</style>
