const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://app.ruswine-spb.ru',
      changeOrigin: true,
    }),
  );
};
