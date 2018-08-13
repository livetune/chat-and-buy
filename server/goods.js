import model from "./model";
import foods from "./foods.json";
const AllOrders = model.allOrders;
const User = model.user;
export default function(router) {
  router.get("/goods/list", ctx => {
    ctx.body = {
      code: 0,
      data: foods.list
    };
  });

  router.post("/goods/buy", async ctx => {
    const { id } = ctx.request.decoded;
    const { buyList } = ctx.request.body;
    let price = 0,
      count = 0,
      desc = "";
    buyList.forEach(v => {
      price += v.count * v.price;
      count += v.count;
      if (!desc) {
        desc = foods.list.find(food => food.id === v.id).name;
      }
    });
    const order = {
      price,
      count,
      state: 0,
      customer: id,
      desc
    };
    const allOrdersModel = new AllOrders(order);
    try {
      let orderData = await allOrdersModel.save();
      if (!orderData) {
        ctx.body = {
          msg: "下单失败",
          code: 1
        };
        ctx.status = 500;
        return;
      }
      let userData = await User.update(
        {
          _id: id
        },
        {
          $push: { orders: orderData._id }
        }
      );
      if (!userData) {
        ctx.body = {
          msg: "下单失败",
          code: 1
        };
        ctx.status = 500;
        return;
      }
      ctx.body = {
        msg: "购买成功",
        code: 0
      };
    } catch (e) {
      ctx.body = {
        msg: "下单失败",
        code: 1
      };
      ctx.status = 500;
    }
  });
}
