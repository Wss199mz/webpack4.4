const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&noInfo=true&reload=true',
    './src/main.js'
  ],
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://localhost:${8002}`]
      },
      onErrors: undefined,
      clearConsole: true
    })
  ]
});
