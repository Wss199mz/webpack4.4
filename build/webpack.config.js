const path = require('path');
const isProd = process.env.NODE_ENV === 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const srcPath = path.join(__dirname, '..', 'src')
const webpack = require('webpack');
module.exports = {
  mode: 'development',
  entry: {
    app: './src/main.js',
  },
  output: {
    filename: isProd? '[name].[hash:8].js' : '[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: isProd?'./' : '/'
  },
  devtool: isProd ? false : 'inline-source-map',
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'src/index.html'), // 引入模版
      favicon: path.join(__dirname, '..', 'src/assets/icon/favicon.ico'),
      filename: 'index.html',
      hash: true,
      minify: { // 对index.html压缩
        collapseWhitespace: isProd, // 去掉index.html的空格
        removeAttributeQuotes: isProd // 去掉引号
      },
      title: 'webpack4.0'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({ // 配置第三方库
      $http: 'axios' // 在.vue文件中可以使用$http发送请求，不用每次都import Axios from 'axios';也不用挂载到vue原型链上
    })
  ],
  resolve: {
    alias: {
      '@': path.join(srcPath, '..', '')
    },
    extensions: ['.js', '.vue', '.scss'], // import引入文件的时候不用加后缀
    modules: [ // 配置路径别名
      'node_modules'
      ,path.resolve(__dirname, '../src/*')
      ,path.resolve(__dirname, '../src/assets')
    ]
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: { // 配置html中图片编译
            minimize: true
          }
        }]
      },
      {
        test: /\.js$/,
        exclude: __dirname + 'node_modules',
        include: __dirname + 'src',
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      },
      {
        test:/\.vue$/,
        use:['vue-loader'] // 依赖于 vue-template-compiler,需要额外安装
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 9000
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      }
    ]
  }
};
