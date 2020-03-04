const express = require('express');
const webpack = require('webpack');
const devServer = require('./dev');
const app = express();
const config = require('./webpack.dev.js');
const compiler = webpack(config);
const { createProxyMiddleware } = require('http-proxy-middleware')
//自动更新编译代码中间件
const devMiddleWare = require('webpack-dev-middleware')(compiler,{});
//自动刷新浏览器中间件
const hotMiddleWare = require('webpack-hot-middleware')(compiler);
app.use(devMiddleWare);
app.use(hotMiddleWare);

var proxyTable = devServer.proxyTable
// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(createProxyMiddleware(options.filter || context, options))
})

// Serve the files on port 3000.
app.listen(devServer.port, function () {});
