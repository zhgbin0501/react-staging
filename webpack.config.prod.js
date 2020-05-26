const path = require('path');
const { smart } = require('webpack-merge');
const PurifyCss = require('purifycss-webpack');
const glob = require('glob-all');
const webpack = require('webpack');

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.config.base');

module.exports = smart(baseConfig, {
    mode: 'production',
    // devtool: 'cheap-module-source-map', // 生产环境不推荐开启sourceMap
    plugins: [
        // 压缩css
        new OptimizeCSSAssetsPlugin({
            cssProcessor: require('cssnano'), // 引入cssnano配置压缩选项
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                }
            }
        }),
        // 删除无用的css
        new PurifyCss({
            paths: glob.sync([
                path.resolve(__dirname, './src/*.html'),
                path.resolve(__dirname, './src/*.js'),
            ])
        }),
        
    ],
    optimization: {
        usedExports: true, // 那个模块被导出了在打包
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