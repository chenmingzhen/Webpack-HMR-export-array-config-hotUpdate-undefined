const got = require("got");
const Koa = require("koa");
const Router = require("koa-router");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const ejs = require("ejs");
const path = require("path");
const webpackConfig = require("./webpackConfig");

const devServer = new WebpackDevServer({ port: 4001 }, webpack(webpackConfig));

devServer.startCallback((e) => {
  if (e) {
    console.log(e);
  }
});

const app = new Koa();
const router = new Router();

router.get("*/*.hot-update.js(on)?", async (ctx) => {
  const options = {
    url: `http://localhost:4001${ctx.url}`,
    method: "GET",
  };
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.body = await got(options.url)
    .then((data) => data.body)
    .catch((e) => {
      console.log("error:", e, options.url);
    });
});

router.get("/*.*", async (ctx, next) => {
  let url = ctx.url.split("/");

  url = url[url.length - 1];

  const options = {
    url: `http://localhost:4001/${url}`,
    method: "GET",
  };

  /** 升级WebpackDevServer后，less,css的热更新会在后面加上一个时间戳，需要将时间戳去掉 */
  url = url.split("?")[0];

  if (url.endsWith(".css")) {
    ctx.set("Content-Type", "text/css; charset=utf-8");
  }

  ctx.set("Access-Control-Allow-Origin", "*");

  ctx.body = await got(options.url)
    .then((data) => data.body)
    .catch((e) => {
      console.error(e, options.url);
    });
});

router.get("/*", async (ctx) => {
  ctx.type = "text/html; charset=utf-8";
  ctx.body = await ejs.renderFile(path.resolve(__dirname, "template.html"));
});

app.use(router.routes());

app.listen(4000, (e) => {
  if (e) {
    console.log(e);
  }
});
