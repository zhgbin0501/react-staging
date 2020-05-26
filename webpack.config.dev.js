const path = require('path');
const { smart } = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');

module.exports = smart(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: '3000', //默认是8080
    compress: true, //是否启用 gzip 压缩
    progress: true, // 进度条
    hot: true, //开启模块热更新
    open: true, // 自动打开浏览器
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 引入热更新插件
  ]
})