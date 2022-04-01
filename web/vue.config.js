const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  devServer: {
    port: 8081,
  },
  // baseUrl: './',
  runtimeCompiler: true,
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = '游戏评价网站';
      return args;
    });
    config.resolve.alias.set('@', resolve('src'));
  },
};
