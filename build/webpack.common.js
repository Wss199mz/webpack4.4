const path = require('path');
const isProd = process.env.NODE_ENV === 'production';
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const srcPath = path.join(__dirname, '..', 'src');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const HappyPack = require('happypack');
const os = require('os');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const resolve = dir => path.join(__dirname, '..', dir);
function createHappyPlugin(id, loaders) {
  return new HappyPack({
    id: id,
    loaders: loaders,
    threadPool: happyThreadPool,
    // make happy more verbose with HAPPY_VERBOSE=1
    verbose: process.env.HAPPY_VERBOSE === '1'
  });
}
module.exports = {
  // entry: { // 使用devServer开启服务
  //   app: './src/main.js'
  // },
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    'element-ui': 'ELEMENT',
    BMap: 'BMap'
  },
  // 警告 webpack 的性能提示
  performance: {
    hints: 'warning',
    // 入口起点的最大体积
    maxEntrypointSize: 50000000,
    // 生成文件的最大体积
    maxAssetSize: 30000000,
    // 只给出 js 文件的性能提示
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.js');
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'src/index.html'), // 引入模版
      favicon: path.join(__dirname, '..', 'src/assets/icon/favicon.ico'),
      filename: 'index.html',
      hash: true,
      minify: {
        // 对index.html压缩
        collapseWhitespace: isProd, // 去掉index.html的空格
        removeAttributeQuotes: isProd // 去掉引号
      },
      title: 'webpack4.0'
    }),
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, '../..'),
      manifest: require('./vendor-manifest.json')
    }),
    new MiniCssExtractPlugin({
      filename: isProd ? '[name].[hash].css' : '[name].css',
      chunkFilename: isProd ? 'static/css/[id].[hash].css' : 'static/css/[id].css'
    }),
    createHappyPlugin('happy-babel-js', ['babel-loader?cacheDirectory=true']),
    createHappyPlugin('happy-babel-vue', ['babel-loader?cacheDirectory=true']),
    createHappyPlugin('happy-css', ['css-loader', 'vue-style-loader']),
    new HappyPack({
      loaders: [
        {
          path: 'vue-loader',
          query: {
            loaders: {
              scss: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
              js: 'happypack/loader?id=happy-babel-vue'
            }
          }
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': path.join(srcPath, '')
    },
    extensions: ['.js', '.vue', '.scss'], // import引入文件的时候不用加后缀
    modules: [
      // 配置路径别名
      'node_modules',
      path.resolve(__dirname, '../src/*'),
      path.resolve(__dirname, '../src/assets')
    ]
  },
  output: {
    filename: isProd ? 'static/js/[name].[hash].js' : 'static/js/[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|bmp|jpeg|svg)$/,
        use: 'url-loader'
      },
      {
        test: /\.(vue|js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        include: [resolve('src')],
        exclude: [/node_modules/, path.resolve(__dirname, '../public/')], // 不检测的文件
        use: [
          {
            loader: 'eslint-loader',
            options: {
              // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
              fix: true,
              formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
            }
          },
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    targets: {
                      browsers: ['> 1%', 'last 2 versions']
                    }
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: ['vue-loader'] // 依赖于 vue-template-compiler,需要额外安装
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader'
          },
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '../',
              name: 'static/fonts/[name].[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(csv|tsv)$/,
        use: ['csv-loader']
      },
      {
        test: /\.xml$/,
        use: ['xml-loader']
      }
    ]
  }
};
