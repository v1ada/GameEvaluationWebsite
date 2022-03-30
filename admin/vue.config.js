module.exports = {
  devServer: {
    disableHostCheck: true,
    port: 8080,
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = '游戏评价网站管理后台';
      return args;
    });
  },
};
