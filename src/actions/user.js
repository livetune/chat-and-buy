// import { REGISTER, LOG_OUT, LOGIN, GET_INFO, GET_MY_ORDERS } from "./types";
import { LOGIN, LOG_OUT, REGISTER, GET_INFO } from "./type";
import { Toast } from "antd-mobile";
import axios from "axios";
import history from "../common/history";
import { connectSocket } from "./chat";

function setToken(token) {
  window.localStorage.setItem("token", token);
  history.push("/");
}

export function logout() {
  return { type: LOG_OUT };
}

export function login({ user, pwd }) {
  return async dispatch => {
    if (!user || !pwd) {
      Toast.fail("请输入账号密码");
    } else {
      try {
        const res = await axios.post("/user/login", { user, pwd });
        if (res.status === 200 && res.data.code === 0) {
          dispatch({ type: LOGIN, payload: res.data.data });
          console.log(res.data.token)
          setToken(res.data.token);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
}

export function getInfo() {
  return async dispatch => {
    try {
      const res = await axios.post("/user/info");
      if (res.status === 200 && res.data.code === 0) {
        dispatch({type:GET_INFO,payload:res.data.data});
        dispatch(connectSocket());
      } 
    } catch (e) {
      console.log(e);
    }
  };
}

export function register({ user, type, pwd }) {
  return async dispatch => {
    if (!user || !pwd || !type) {
      Toast.faul("请输入账号密码");
    } else {
      try {
        const res = await axios.post("/user/register", { user, type, pwd });
        if (res.status === 200 && res.data.code === 0) {
          dispatch({ type: REGISTER, payload: res.data.data });
          setToken(res.data.token);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
}
