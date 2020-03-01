const express = require('express');
const webpack = require('webpack');
const devServer = require('./dev');
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})
const app = express();
const config = require('./webpack.dev.js');
const compiler = webpack(config);

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(devMiddleware(compiler, {
  publicPath: config.output.publicPath,
  quiet: true
}));

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})
app.use(devMiddleware)
// Serve the files on port 3000.
app.listen(devServer.port, function () {});
