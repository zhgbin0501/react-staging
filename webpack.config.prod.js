const path = require('path');
const { smart } = require('webpack-merge');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.config.base');

module.exports = smart(baseConfig, {
    mode: 'production',
    // devtool: 'cheap-module-source-map', // 生产环境不推荐开启sourceMap
    output: {
      path: path.resolve(__dirname, 'build'), //必须是绝对路径
      filename: '[name].[hash:6].js',
      publicPath: '/' //通常是CDN地址
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**'] //不删除dll目录下的文件
        }),
    ],
    optimization: {
        // 压缩 css
        minimizer: [new TerserWebpackPlugin({}), new OptimizeCSSAssetsPlugin({})],
        // 分割代码块
        splitChunks: {
            cacheGroups: {
                vendor: {
                    //第三方依赖
                    priority: 1, //设置优先级，首先抽离第三方模块
                    name: 'vendor',
                    test: /node_modules/,
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 1 //最少引入了1次
                },
                //缓存组
                common: {
                    //公共模块
                    chunks: 'initial',
                    name: 'common',
                    minSize: 100, //大小超过100个字节
                    minChunks: 3 //最少引入了3次
                }
            }
        }
    }, 
})