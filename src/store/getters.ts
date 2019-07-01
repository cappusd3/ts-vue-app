const getters = {
  device: (state: any) => state.app.device,
  theme: (state: any) => state.app.theme,
  token: (state: any) => state.user.token,
  avatar: (state: any) => state.user.avatar,
  userInfo: (state: any) => state.user.info,
  addRouters: (state: any) => state.permission.addRouters,
  multiTab: (state: any) => state.app.multiTab,
  roles: (state: any) => state.user.roles,
}

export default  getters;
