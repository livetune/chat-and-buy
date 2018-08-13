import { GOODS_LIST, ADD_TO_CART, BUY_SUCCESS } from "../actions/type";
import { List, Map } from "immutable";

const initState = Map({
  goodsList: List([]),
  shopCart: List([]),
  totalPrice: 0
});

/**
 *
 * @param {} shopCart 当前购物车
 * @param {} {id       商品id
 * @param {}  price     商品价格
 * @param {}  count}    商品总数
 * @param {} totalPrice 总价
 */
function changeShopCart(shopCart, { id, price, count }, totalPrice) {
  const index = shopCart.findIndex(v => v.get("id") === id);
  if (index === -1) {
    if (count === 0) {
      return [shopCart, totalPrice];
    }
    shopCart = shopCart.push(Map({ id, count, price }));
    totalPrice += count * price;
    return [shopCart, totalPrice];
  }
  shopCart = shopCart.update(index, product => {
    const currentCount = product.get("count");
    totalPrice = totalPrice - (currentCount - count) * price;
    return product.set("count", count);
  });
  if (count === 0) {
    shopCart = shopCart.remove(index);
  }

  return [shopCart, totalPrice];
}

export default function(state = initState, action) {
  switch (action.type) {
    case GOODS_LIST:
      return state.set("goodsList", action.payload);
    case ADD_TO_CART:
      let data = changeShopCart(
        state.get("shopCart"),
        action.payload,
        state.get("totalPrice")
      );
      return state.merge({ shopCart: data[0], totalPrice: data[1] });
    case BUY_SUCCESS:
      return state.merge({ shopCart: List([]), totalPrice: 0 });
    default:
      return state;
  }
}
