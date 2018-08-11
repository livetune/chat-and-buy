import "./db";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import logger from "koa-logger";
import Router from "koa-router";
import config from "./config";
import jwtMiddleware from "./jwtMiddleware";
const router = Router();
const app = new Koa();
app.use(bodyParser());
app.use(logger());
app.use(jwtMiddleware());

app.use(router.routes());
app.use(router.allowedMethods());

router.get("/", (ctx, next) => {
  ctx.body = "index";
  next();
});

require("./router")(router);
const server = require("http").Server(app.callback());
const io = global.io = require("socket.io")(server);
require("./socket")(io);
server.listen(config.PROT, function() {
  console.log("node start");
});
