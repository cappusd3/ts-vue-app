# ts-vue-app

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### 特定文件说明
```
1. shims-tsx.d.ts: 允许你以 .tsx结尾的文件，在 Vue项目中编写 jsx代码
2. shims-vue.d.ts: 主要用于 TypeScript 识别 .vue 文件， Ts默认并不支持导入 vue 文件，这个文件告诉 ts导入 .vue 文件都按 VueConstructor<Vue>处理。
3. vue-property-decorator:
  Link: https://www.npmjs.com/package/vue-property-decorator
  3.1 @Component (from vue-class-component)
  3.2 @Prop
  3.3 @Model
  3.4 @Watch
  3.5 @Emit
  3.6 @Inject
  3.7 @Provider
  3.8 Mixins (the helper function named mixins defined at vue-class-component)
```


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
# ts-vue-app
