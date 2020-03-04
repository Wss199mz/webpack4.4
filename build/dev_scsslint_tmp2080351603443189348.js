module.exports = {
  contentBase: './dist',
  hot: true,
  overlay: true,
  quiet: true,
  host: 'localhost',
  port: 8001, // 端口
  stats: 'errors-only',
  open: true, // 自动打开页面
  proxyTable: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true
    }
  }
};
