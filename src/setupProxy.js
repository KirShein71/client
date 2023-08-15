const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://app.ruswine-spb.ru',
      changeOrigin: true,
    }),
  );
};
