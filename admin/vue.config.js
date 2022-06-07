module.exports = {
  // 设置 开发环境 服务器端口
  devServer: {
    disableHostCheck: true,
    port: 8080,
  },
  // 设置浏览器 title
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = '游戏评价网站管理后台';
      return args;
    });
  },
  // 打包导出的目录
  outputDir: __dirname + '/../server/admin',
  //部署时的基本URL
  publicPath: process.env.NODE_ENV === 'production' ? '/gameweb/admin' : '/',
};
