import { GOODS_LIST } from "../actions/type";
import { List, Map } from "immutable";

const initState = Map({
  goodsList: List([]),
  shopCart: List([]),
  totalPrice: 0
});
export default function(state = initState, action) {
  switch (action.type) {
    case GOODS_LIST:
      return state.set("goodsLsit", action.payload);
    default:
      return state;
  }
}
