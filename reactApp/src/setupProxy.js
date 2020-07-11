const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/game",
    createProxyMiddleware({
      target: "http://39.98.125.235:8088/",
      changeOrigin: true,
    })
  );
  app.use(
    "/resource",
    createProxyMiddleware({
      target: "http://39.98.125.235:8088/",
      changeOrigin: true,
    })
  );
  app.use(
    "/global",
    createProxyMiddleware({
      target: "http://39.98.125.235:8088/",
      changeOrigin: true,
    })
  );
  app.use(
    "/news",
    createProxyMiddleware({
      target: "http://39.98.125.235:8088/",
      changeOrigin: true,
    })
  );
  app.use(
    "/raiders",
    createProxyMiddleware({
      target: "http://39.98.125.235:8088/",
      changeOrigin: true,
    })
  );
  app.use(
    "/video",
    createProxyMiddleware({
      target: "http://39.98.125.235:8088/",
      changeOrigin: true,
    })
  );
};
