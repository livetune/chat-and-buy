import { LOGIN, REGISTER, GET_INFO } from "../actions/type";

import { Map } from "immutable";

const initState = Map({
  user: "",
  type: "",
  id: "",
  path: ""
});

export default function(state = initState, action) {
  switch (action.type) {
    case LOGIN:
    case REGISTER:
    case GET_INFO:
      return state.merge({
        ...action.payload,
        path: action.payload.type === "customer" ? "/goods" : "/allOrders"
      });

    default:
      break;
  }
  return state;
}
