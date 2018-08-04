import jwt from "jsonwebtoken";
import key from "./key";

export default function(options = {}) {
  return async (ctx, next) => {
    if (ctx.url === "/user/login" || ctx.url === "/user/register") {
      await next();
      return;
    }

    const token =
      ctx.request.body.token ||
      ctx.query.token ||
      ctx.headers["x-access-token"];
    if (token) {
      try {
        let res = await jwt.verify(token, key);
        ctx.request.decoded = res;
        await next();
      } catch (error) {
        ctx.status = 401;
        ctx.body = {
          errorMsg: "登陆过期"
        };
      }
    } else {
      ctx.status = 401;
      ctx.body = {
        errorMsg: "请先登录"
      };
    }
  };
}
