const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  // 设置 开发环境 服务器端口
  devServer: {
    port: 8081,
  },
  runtimeCompiler: true,
  // 设置浏览器 title
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = '游戏评价网站';
      return args;
    });
    // 设置 @ 为根目录
    config.resolve.alias.set('@', resolve('src'));
  },
};
