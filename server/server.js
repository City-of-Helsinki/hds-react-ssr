import express from "express";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import StyleContext from "isomorphic-style-loader/StyleContext";
import App from "../src/App";
import { Helmet } from "react-helmet";
import { ServerStyleSheets } from "@mui/styles";

// Configure constants
const app = express();
app.disable("x-powered-by");

// This is required for proxy setups to work in production
app.set("trust proxy", true);

// Add static folder
app.use(express.static(path.resolve(__dirname, "src")));

// Add middlewares
app.use(`/*`, (req, res, next) => {
  next();
});
// Handle treenode redirect
app.use("/", (req, res, next) => {
  if (req.query.treenode != null && process.env.DOMAIN.includes(req.get("host"))) {
    const fullUrl = req.originalUrl.replace(/treenode/g, "service_node");
    res.redirect(301, fullUrl);
    return;
  }
  next();
});

app.get("/*", (req, res, next) => {
  // CSS for all rendered React components
  const css = new Set();
  const insertCss = (...styles) => styles.forEach((style) => css.add(style._getCss()));

  // Create server style sheets
  const sheets = new ServerStyleSheets();

  const jsx = sheets.collect(
    <StaticRouter location={req.url} context={{}}>
      {/* Provider to help with isomorphic style loader */}
      <StyleContext.Provider value={{ insertCss }}>
        <App />
      </StyleContext.Provider>
    </StaticRouter>
  );
  const reactDom = ReactDOMServer.renderToString(jsx);
  const cssString = sheets.toString();
  const helmet = Helmet.renderStatic();

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(htmlTemplate(req, reactDom, css, cssString, helmet));
});

console.log(`Starting server on port ${process.env.PORT || 3000}`);
app.listen(process.env.PORT || 3000);

const htmlTemplate = (req, reactDom, css, cssString, helmet) => `
<!DOCTYPE html>
<html>
  <head>
  </head>

  <body>
    <div id="app">${reactDom}</div>
    <style>${[...css].join("")}</style>
    <script src="/index.js"></script>
  </body>
</html>
`;
