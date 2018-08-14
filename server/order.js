import model from "./model";
const User = model.user;
const AllOrders = model.allOrders;

export default function(router) {
  router.get("/order/allOrders", async ctx => {
    try {
      let res = await AllOrders.find({ state: 0 }).sort({ date: -1 });
      ctx.body = {
        code: 0,
        data: res
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        msg: "后端出错"
      };
    }
  });

  router.post("/order/getOrder", async ctx => {
    const { orderId } = ctx.request.body;
    const { id } = ctx.request.decoded;
    try {
      let orderData = await AllOrders.findOneAndUpdate(
        { _id: orderId, state: 0 },
        {
          $set: {
            state: 1,
            deliver: id
          }
        }
      );
      console.log(orderData);
      if (!orderData) {
        ctx.body = {
          msg: "该单子已被接单",
          code: 1
        };
        return;
      }
      await User.update(
        { _id: id },
        {
          $push: {
            orders: orderId
          }
        }
      );

      let receiver = orderData.customer;
      if (global.clients.hasOwnProperty([receiver])) {
        global.io
          .to(global.clients[receiver])
          .emit("getOrder", { orderId, id });
      }
      ctx.body = {
        msg: "接单成功",
        code: 0
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        msg: "服务器出错"
      };
    }
  });
  router.post("/order/affirm", async ctx => {
    const { orderId } = ctx.request.body;
    const { id } = ctx.request.decoded;
    try {
      let orderData = await AllOrders.findOneAndUpdate(
        { _id: orderId, state: 1 },
        {
          $set: {
            state: 2,
            deliver: id
          }
        }
      );
      if (!orderData) {
        ctx.body = {
          msg: "该单子已完成",
          code: 1
        };
        return;
      }
      let receiver =
        orderData.deliver === id ? orderData.deliver : orderData.customer;
      if (global.clients.hasOwnProperty([receiver])) {
        global.io.to(global.clients[receiver]).emit("affirmOrder", { orderId });
      }
      ctx.body = {
        msg: "订单成功",
        code: 0
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        msg: "服务器出错"
      };
    }
  });
}
