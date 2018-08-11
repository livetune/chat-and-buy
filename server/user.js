import Model from "./model";
import key from "./key";
const userModel = Model.user;
const jwt = require("jsonwebtoken");
export default function(router) {
  router.post("/user/login", async (ctx, next) => {
    const { user, pwd } = ctx.request.body;
    await userModel.findOne({ user, pwd }, function(e, doc) {
      if (!doc) {
        console.log(doc);
        ctx.status = 200;
        ctx.body = {
          msg: "登录失败，用户名密码不匹配",
          code: 1
        };
        return;
      }

      const { user, type, _id } = doc;
      const token = jwt.sign({ id: _id }, key, {
        expiresIn: 60 * 60 * 24 * 7
      });
      ctx.body = {
        code: 0,
        token,
        data: {
          user,
          type,
          _id
        }
      };
    });
  });
  router.post("/user/register", async (ctx, next) => {
    const { user, pwd, type } = ctx.request.body;
    let res;
    try {
      res = await userModel.findOne({ user });
      if (res) {
        ctx.body = {
          code: 1,
          msg: "用户已存在"
        };
        return;
      }
    } catch (e) {
      ctx.status = 500;
      ctx.body = {
        code: 1,
        msg: "服务器出错了"
      };
    }

    const model = new userModel({ user, pwd, type });
    try {
      res = await model.save();
      const { user, type, _id } = res;
      const token = jwt.sign({ id: _id }, key, {
        expiresIn: 60 * 60 * 24 * 7
      });
      ctx.status = 200;
      ctx.body = {
        code: 0,
        data: { user, type, id: _id },
        token
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        code: 1,
        msg: "服务器出错了"
      };
    }
  });

  router.post("/user/info", async (ctx, next) => {
  
    const { id } = ctx.request.decoded;
    await userModel.findOne({ _id: id }, function(e, doc) {
      if (!doc) {
        console.log(doc);
        ctx.status = 401;
        ctx.body = {
          msg: "登录失败，token失效"
        };
        return;
      }

      if (e) {
        ctx.status = 500;
        ctx.body = {
          msg: "服务器出错",
          code: 0
        };
        return;
      }

      const { user, type, _id } = doc;

      ctx.body = {
        code: 0,
        data: {
          user,
          type,
          id:_id
        }
      };
    });
  });
}
