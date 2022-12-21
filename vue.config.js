module.exports = {
  publicPath: './',
  productionSourceMap: true,
  devServer: {
    port: 8080,
    host: 'localhost',
    open: true,
    //设置代理
    proxy: 'http://localhost:3000',
    // proxy: {
    //   '/': {
    //     target: 'http://localhost:3000',
    //     ws: true,
    //     changeOrigin: true,
    //   },
    // },
  },
};
