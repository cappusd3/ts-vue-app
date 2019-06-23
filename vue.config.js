module.exports = {
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#1DA57A',
          'link-color': '#1DA57A',
          'border-radius-base': '2px',
        }
      }
    }
  },
  pluginOptions: {
    i18n: {
      locale: 'zh',
      fallbackLocale: 'en',
      localeDir: 'lang',
      enableInSFC: true
    }
  },
  devServer: {
    proxy: {
      '/hrm/api': {
        target: 'http://192.168.1.25:10751/', // Dev环境
        changeOrigin: true,
        autoRewrite: true,
        cookieDomainRewrite: true,
        pathRewrite: {
          '^/hrm/api/': '/'
        }
      },
      '/mock/api': {
        target: 'https://www.easy-mock.com/mock/5b471707cf484b33b42c35ce/chensd/', // easy mock
        changeOrigin: true,
        autoRewrite: true,
        cookieDomainRewrite: true,
        pathRewrite: {
          '^/mock/api/': '/'
        }
      }
    }
  },
}
