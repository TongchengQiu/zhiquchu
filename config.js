const path = require('path');

module.exports = {
  build: {
    index: path.resolve(__dirname, 'dist/index.html'),
    assetsRoot: path.resolve(__dirname, 'dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/static/operapp/',
    productionSourceMap: false
  },
  dev: {
    port: 8001,
    mockPort: 8888,
    proxyTable: {
      '/operapp': 'http://wanmujia.com',
      // '/operapp': 'http://localhost:8888',
    }
  }
};
