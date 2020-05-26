const {smart} = require('webpack-merge');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.config.base');

module.exports = smart(baseConfig, {
    mode: 'production',
    // devtool: 'cheap-module-source-map', // 生产环境不推荐开启sourceMap
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns:['**/*', '!dll', '!dll/**'] //不删除dll目录下的文件
        }),
    ],
    optimization: {
        // 压缩 css
        minimizer: [new TerserWebpackPlugin({}), new OptimizeCSSAssetsPlugin({})],
        // 分割代码块
        // splitChunks : {
        //     chunks: 'all',

        //     // 缓存分组
        //     cacheGroups: {
        //         // 第三方模块
        //         vender: {
        //             name: 'vender', // chunk名称
        //             priority: 1, // 权限更高，优先抽离
        //             test: /node_modules/,
        //             minSize: 0, // 最大限制
        //             minChunks: 1 // 最少复用过几次
        //         },
        //         // 公共的模块
        //         common: {
        //             name: 'common', // chunks的名称
        //             priority: 0, // 优先级
        //             minSize: 0,
        //             minChunks: 2  // 公用模块最小复用次数
        //         }
        //     }
        // }
    }
})