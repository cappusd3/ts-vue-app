<template>
  <div class="header-animat">
    <a-layout-header
      :class="['ant-header-fixedHeader', sidebarOpened ? 'ant-header-side-opened': 'ant-header-side-closed']"
      :style="{ padding: '0' }">
      <div class="header">
        <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggle"></a-icon>
        <div>这里是用户一些工具菜单</div>
      </div>
    </a-layout-header>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import { State } from 'vuex-class';

@Component({})
export default class GlobalHeader extends Vue {
  @Prop({ default: false }) public collapsed!: boolean;

  @State((state: any) => state.app.sidebar) public sidebarOpened?: boolean

  @Emit('toggle')
  private toggle() {}
}
</script>

<style lang="less" scoped>
.header-animat {
  position: relative;
  z-index: 2;
}
</style>

