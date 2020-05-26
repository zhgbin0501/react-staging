const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'), //必须是绝对路径
    filename: '[name].[hash:6].js',
    publicPath: '/' //通常是CDN地址
  },
  resolve: {
    extensions: ['.js', '.jsx', 'json'],
    alias: {
      '@': path.resolve(__dirname, 'src'), // 绝对路径，任何src中的文件都可以通过@/xxx找到所需文件
      pages: path.join(__dirname, "src/pages"),
    }
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        use: ['cache-loader', 'Happypack/loader?id=js'], // 使用cache-loader避免重复打包
        include: [path.resolve(__dirname, 'src')]
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,  // 替换之前的style-loader
          'css-loader', // 处理css样式文件
          'postcss-loader', //自动添加浏览器前缀
          'less-loader', // 将less预处理器的语法转换成css语法
        ],
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)/,
        use: [{
          loader: 'url-loader',
          options: {
            outputPath: 'images/', // 图片输出的路径
            limit: 10 * 1024 // 小于10k图片转换成base64
          }
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240, //10K
              esModule: false,
              name: '[name]_[hash:6].[ext]',
              outputPath: 'fonts' // 字体输出文件夹
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /.html$/, // 处理HTML本地文件
        use: 'html-withimg-loader'
      }
    ]
  },
  plugins: [

    // 增加多线程打包
    new HappyPack({
      id: 'js', //和rule中的id=js对应
      use: ['babel-loader'] //必须是数组
    }),

    new HappyPack({
      id: 'css',//和rule中的id=css对应
      use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader'],
    }),

    new CopyWebpackPlugin([
      {
        from: 'public/js/*.js',
        to: path.resolve(__dirname, 'dist', 'js'),
        flatten: true
      },
      //还可以继续配置其它要拷贝的文件
    ]),
    new webpack.HotModuleReplacementPlugin(), //热更新插件

    // 抽离CSS文件
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash:8].css' // 将css单独打进一个文件夹中
    }),

    new HardSourceWebpackPlugin(), // 为模块提供中间缓存

    new CleanWebpackPlugin({
      // cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**'] //不删除dll目录下的文件
    }),

    new HtmlWebpackPlugin({ // 多页面入口 -- 生成index.html
      template: './public/index.html',
      filename: 'index.html',
      // 表示该页面需要引入哪些chunk
      chunks: ['index', 'common', 'vender'], // 只引用index.js
      minify: {
        removeAttributeQuotes: false, //是否删除属性的双引号
        collapseWhitespace: false, //是否折叠空白
        minifyCSS: true // 压缩内联css
      },
    }),

    // new HtmlWebpackPlugin({ // 多页面入口 -- 生成other.html
    //   template: './public/other.html',
    //   filename: 'other.html',
    //   // chunks: ['other', 'vender'], // 只引用other.js
    // }),

  ],
}