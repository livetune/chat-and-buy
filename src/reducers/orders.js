import { GET_ALL_ORDERS } from "../actions/type";
import { Map, List } from "immutable";

const initState = Map({
  allOrders: List([])
});

export default function(state = initState, action) {
  switch (action.type) {
    case GET_ALL_ORDERS:
    console.log(action)
      return state.set("allOrders", action.payload);
    default:
      return state;
  }
  
}
