import { GOODS_LIST, ADD_TO_CART, BUY_SUCCESS } from "./type";
import axios from "axios";
import { Toast } from "antd-mobile";
import { fromJS } from "immutable";

export function getGoodsInfo() {
  return async dispatch => {
    try {
      let res = await axios.get("/goods/list");
      if (res.status === 200 && res.data.code === 0) {
        return dispatch({ type: GOODS_LIST, payload: fromJS(res.data.data) });
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export function addToCart({ id, price, count }) {
  if (!Number.isInteger(count)) {
    count = 0;
  }
  count = count > 99 ? 99 : count;
  count = count < 0 ? 0 : count;
  return { type: ADD_TO_CART, payload: { id, price, count } };
}

export function buy() {
  return async (dispatch, state) => {
    try {
      let res = await axios.post("/goods/buy", {
        buyList: state()
          .get("goods")
          .get("shopCart")
          .toJS()
      });
      if (res.status === 200 && res.data.code === 0) {
        Toast.success("购买成功", 1);
        dispatch({ type: BUY_SUCCESS });
      }
    } catch (e) {
      console.log(e);
    }
  };
}
