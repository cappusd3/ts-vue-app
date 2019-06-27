<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ $t('msg.zh') }}</h2>
    <button type="button" @click="onToggleLanguage">toggle language</button>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript" target="_blank" rel="noopener">typescript</a></li>
    </ul>
    <h3 @click="changeMessage">{{ message }}</h3>
    <h4>{{ reversedMessage }}</h4>
    <!-- <a-radio-group :defaultValue="null" @change="changeLocale">
      <a-radio-button key="en" :value="null">English</a-radio-button>
      <a-radio-button key="cn" :value="zhCN">中文</a-radio-button>
    </a-radio-group> -->
    <div class="example">
      <a-pagination :defaultCurrent="1" :total="50" showSizeChanger />
    </div>
    <a-button type="primary">Primary</a-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getMenus } from '@/api/utils';
import { Button, Pagination } from 'ant-design-vue';

// TODO: 这里在按需加载中，以下这一步为何不整合进去？
Vue.use(Button);
Vue.use(Pagination);

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  // data
  private message = 'Hello World!';

  // computed
  private get reversedMessage(): string {
    return this.message.split('').reverse().join('');
  }

  // methods
  public changeMessage(): void {
    this.message = 'Good Bye!';
  }

  public onToggleLanguage(): void {
    const lang = this.$i18n.locale;
    const targetLang = lang === 'zh' ? 'en' : 'zh';
    this.$i18n.locale = targetLang;
    this.$store.dispatch('setLanguage', targetLang);
  }

  // life cycle: private: 生命周期不应该公开给其他组件，而 methods 有可能用 Emit 来传递消息
  private created(): void {
    getMenus().then((response) => {
      console.log(response);
    })
  }

  private mounted(): void {
    console.log('mounted');
  }

  private updated(): void {
    console.log('updated');
  }

  private destroyed(): void {
    console.log('destroyed');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
