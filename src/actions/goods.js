import { GOODS_LIST } from "./type";
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
