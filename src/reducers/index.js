import { combineReducers } from "redux-immutable";
import userReducer from "./user";
import { LOG_OUT } from "../actions/type";
import history from "../common/history";

const appReducer = combineReducers({
  user: userReducer
});

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    history.push("./register");
    window.localStorage.clear();
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
