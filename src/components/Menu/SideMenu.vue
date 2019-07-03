<template>
  <a-layout-sider
    :class="['sider', isDesktop() ? null: 'shadow', theme, fixSiderbar ? 'ant-fixed-sidemeu': null ]"
    width="256px"
    :collapsible="collapsible"
    v-model="collapsed"
    :trigger="null">
    <!-- <logo /> -->
    <s-menu
      :collapsed="collapsed"
      :menus="menus"
      :theme="theme"
      :mode="mode"
      @select="onSelect"
      style="padding: 16px 0px;"
    ></s-menu>
  </a-layout-sider>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { State } from 'vuex-class';
import SMenu from './index';
@Component({
  components: {
    's-menu': SMenu
  }
})
export default class SideMenu extends Vue {
  @Prop({ default: 'inline' }) public mode?: string;
  @Prop({ default: 'dark' }) public theme?: string;
  //  TODO: 这里 默认值为何不生效
  @Prop({ default: false }) public collapsible?: boolean;
  @Prop({ default: false }) public collapsed?: boolean;
  @Prop({ default: [] }) public menus!: [];

  @State((state) => state.app.fixSiderbar) public fixSiderbar?: boolean

  public isDesktop() {
    return true;
  }

  // TODO: 改为 vuex-class 写法
  public onSelect(obj: any) {
    this.$emit('menuSelect', obj);
  }
}
</script>

<style lang="less" scoped>

</style>

