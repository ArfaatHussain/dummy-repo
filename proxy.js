const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = process.env.PORT || 4000;

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // or frontend origin
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.use("/api", createProxyMiddleware({
  target: "http://pdf-backend-env.eba-cauaw3hk.eu-north-1.elasticbeanstalk.com",  
  changeOrigin: true,
  pathRewrite: {
    "^/api": "", 
  },
  logLevel: "debug",
}));

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});