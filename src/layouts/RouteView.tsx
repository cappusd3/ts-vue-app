import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class RouteView extends Vue {
  // !是和?相对的，是typescript的语法，表示强制解析
  @Prop({ default: true }) private keepAlive!: boolean;

  private render() {
    const { $route: { meta }, $store: { getters } } = this;
    const isKepp = (
      <keep-alive>
        <router-view />
      </keep-alive>
    );

    const notKeep = (
      <router-view />
    )

    if (!getters.multiTab && meta.keepAlive === false) {
      return notKeep;
    }
    return this.keepAlive || getters.multiTab || meta.keepAlive ? isKepp : notKeep;
  }
}
