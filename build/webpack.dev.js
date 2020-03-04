const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const devServer = require('./dev');
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://localhost:${devServer.port}`],
      },
      onErrors: undefined,
      clearConsole: true,
    })
  ]
});
