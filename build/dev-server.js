const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.dev.js');
const devServer = require('./dev');
const options = {
  contentBase: './dist',
  hot: true,
  overlay: true,
  quiet: true,
  host: 'localhost'
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(devServer.port, 'localhost', () => {
  console.log('dev server listening on port 5000');
});
