export interface Meta {
  title: string,
  keepAlive?: boolean,
  icon?: string,
  permission?: string[],
  target?: string
}

export interface MenuItem {
  [key: string]: any,
  path: string,
  name: string,
  redirect?: string,
  component?: any,
  meta: Meta,
  children: MenuItem[],
}


export interface RouterItem {
  name?: string,
  component?: any,
  path: string,
  icon?: string,
  hidden?: boolean,
  permission?: string | string[] | boolean,
  redirect?: string | object,
  children: RouterItem | undefined | null[],
  meta?: any,
}
