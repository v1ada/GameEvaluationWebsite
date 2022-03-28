module.exports = {
  devServer: {
    port: 8081,
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = '游戏评价网站';
      return args;
    });
  },
};
