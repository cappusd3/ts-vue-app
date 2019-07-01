import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator';
import { Menu, Icon } from 'ant-design-vue';
import { MenuItem } from '@/interface';
import { RouteRecord } from 'vue-router';

const { Item, SubMenu } = Menu;

@Component
export default class SMenu extends Vue {
  @Prop({ required: true }) public menus!: [];
  @Prop({ default: 'dark', required: false, type: String }) public theme?: string;
  @Prop({ default: 'inline', required: false, type: String }) public mode?: string;
  @Prop({ default: false, required: false, type: Boolean }) public collapsed?: boolean; // sider 当前收起状态

  public openKeys: string[] = [];
  public selectedKeys: string[] = [];
  public cachedOpenKeys: string[] = [];

  // TODO: 这块作用？
  get rootSubmenuKeys() {
    return []
  }

  @Watch('collapsed')
  public onChangeValue(newVal: boolean, oldVal: boolean) {
    if (newVal) {
      this.cachedOpenKeys = this.openKeys.concat();
      this.openKeys = [];
    } else {
      this.openKeys = this.cachedOpenKeys;
    }
  }

  private mounted() {
    this.updateMenu();
  }

  // methods
  // select menu item
  private onOpenChange(openKeys: string[]) {

  }

  private updateMenu() {
    const routes: RouteRecord[] = this.$route.matched.concat();
    const { hidden } = this.$route.meta;
    if (routes.length >= 3 && hidden) {
      routes.pop();
      this.selectedKeys = [routes[routes.length - 1].path];
    } else {
      const selectedRouteItem: RouteRecord | undefined  = routes.pop();
      if (selectedRouteItem) {
        this.selectedKeys = [selectedRouteItem.path];
      }
    }
  }

  // render method
  //
  private renderItem(menu: MenuItem) {
    if (!menu.hidden) {
      return menu.children && !menu.hideChildrenInMenu ? this.renderSubMenu(menu) : this.renderMenuItem(menu);
    }
    return null;
  }
  // <a-menu-item key="3">
  //  <a-icon type="desktop">
  //  <span>xxxx</span>
  // </a-menu-item>
  private renderMenuItem(menu: MenuItem) {
    const target = menu.meta.target || null;
    const tag = target && 'a' || 'router-link';
    const props = { to: { name: menu.name } };
    const attrs = { href: menu.path, target: menu.meta.target };

    if (menu.children && menu.hideChildrenInMenu) {
      // 拥有子菜单 并且 父菜单是要隐藏子菜单的
      // 遍历为子菜单添加一个 hidden 属性
      // 用来给刷新页面时， selectedKeys 做控制用
      menu.children.forEach((item) => {
        item.meta = Object.assign(item.meta, { hidden: true });
      })
    }

    return (
      <Item {...{ key: menu.path }}>
        <tag {...{ props, attrs }}>
          {this.renderIcon(menu.meta.icon)}
          <span>{menu.meta.title}</span>
        </tag>
      </Item>
    )
  }

  // <a-sub-menu key="sub1">
  //   <span slot="title"><a-icon type="mail" /><span>Navigation One</span></span>
  //   <a-menu-item key="5">Option 5</a-menu-item>
  //   <a-menu-item key="6">Option 6</a-menu-item>
  //   <a-menu-item key="7">Option 7</a-menu-item>
  //   <a-menu-item key="8">Option 8</a-menu-item>
  // </a-sub-menu>
  private renderSubMenu(menu: MenuItem) {
    // TODO: 这里的类型推断 ？？
    const itemArr: any = [];
    if (!menu.hideChildrenInMenu) {
      // 这里 renderItem 递归
      menu.children.forEach((item) => itemArr.push(this.renderItem(item)));
    }
    return (
      <SubMenu {...{ key: menu.path }}>
        <span slot='title'>
          {this.renderIcon(menu.meta.icon)}
          <span>{menu.meta.title}</span>
        </span>
        {itemArr}
      </SubMenu>
    )
  }

  // <a-icon type="desktop">
  private renderIcon(icon: any) {
    if (icon === 'none' || icon === undefined) {
      return null;
    }
    const props: {
      component?: string,
      type?: string
    } = {};
    typeof (icon) === 'object' ? props.component = icon : props.type = icon;
    return (
      <Icon {...{ props }}></Icon>
    )
  }

  private render() {
    const { mode, theme, menus, openKeys } = this;
    const props = {
      mode,
      theme,
      openKeys,
    }

    const on = {
      select: (obj: any) => {
        this.selectedKeys = obj.selectedKeys;
        this.$emit('select', obj);
      },
      openChange: this.onOpenChange,
    }

    const menuTree = menus.map((item: MenuItem) => {
      if (item.hidden) {
        return null;
      }
      return this.renderItem(item);
    })
    // {...{ props, on: on }}
    return (
      <Menu v-model={this.selectedKeys} {...{ props, on }}>
        {menuTree}
      </Menu>
    )
  }
}
