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

      <!-- layout content -->

      <!-- layout footer -->
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SideMenu from '@/components/Menu/SideMenu.vue';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { MenuItem, RouterItem } from '@/interface';
import { debuglog } from 'util';

const Permission = namespace('permission');

@Component({
  components: {
    SideMenu,
  }
})
export default class BasicLayout extends Vue {
  public device: string = 'desktop';
  public collapsed: boolean = false;
  public menus: RouterItem[] = [];
  // 这个可以放在共同地方控制
  public navTheme: string = 'dark';
  public layoutMode: string = 'topmenu';
  public contentWidth: string = '';
  public sidebarOpened: boolean = true;

  @Permission.State('addRouters') private mainMenu!: any[];

  get contentPaddingLeft() {
    if (this.sidebarOpened) {
      return '256px'
    }
    return '80px';
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

<style lang="less" scoped>

</style>

