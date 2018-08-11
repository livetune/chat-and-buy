import model from "./model";
import foods from "./foods.json";
const User = model.user;
// const Allorders =
export default function(router) {
  router.get("/goods/list", ctx => {
    ctx.body = {
      code: 0,
      data: foods.list
    };
  });

}
