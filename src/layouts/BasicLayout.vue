<template>
  <a-layout :class="['layout', device]">
    <!-- SideMenu -->
    <side-menu
      mode="inline"
      :menus="menus"
      :theme="navTheme"
      :collapsed="collapsed"
      :collapsible="true"
    ></side-menu>
    <a-layout :class="[layoutMode, `content-width-${contentWidth}`]" :style="{ paddingLeft: contentPaddingLeft, minHeight: '100vh' }">
      <!-- layout header -->
      <global-header
        :mode="layoutMode"
        :collapsed="collapsed"
        @toggle="toggle"
      ></global-header>
      <!-- layout content -->

      <!-- layout footer -->
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { MenuItem, RouterItem } from '@/interface';
import { triggerWindowResizeEvent } from '@/utils/util';
import SideMenu from '@/components/Menu/SideMenu.vue';
import { asyncRouteMap, constantRouterMap } from '@/config/router.config';
import GlobalHeader from '@/components/GlobalHeader';

const Permission = namespace('permission');
const App = namespace('app');

@Component({
  components: {
    SideMenu,
    GlobalHeader,
  }
})
export default class BasicLayout extends Vue {
  public device: string = 'desktop';
  public collapsed: boolean = false;
  public menus: MenuItem[] = [];
  // 这个可以放在共同地方控制
  public navTheme: string = 'dark';
  public layoutMode: string = 'sidemenu';
  public contentWidth: string = '';
  public sidebarOpened: boolean = true;
  @Permission.State('addRouters') private mainMenu!: any[];
  @App.State('fixSiderbar') public fixSiderbar!: boolean;
  @Action('app/setSideBar') private setSidebar: any

  get contentPaddingLeft() {
    if (!this.fixSiderbar) {
      return '0'
    }
    if (this.sidebarOpened) {
      return '256px'
    }
    return '80px';
  }

  // methods
  public toggle() {
    this.collapsed = !this.collapsed;
    this.setSidebar(!this.collapsed);
    triggerWindowResizeEvent();
  }

  private created() {
    // TODO: 类型推论？？？
    const findItem: any = this.mainMenu.find((item: any) => item.path === '/');
    if (findItem && findItem.children) {
      this.menus = findItem.children || [];
    }
    this.collapsed = !this.sidebarOpened;
  }

}
</script>

<style lang="less">
@import url('../style/global.less');

</style>

