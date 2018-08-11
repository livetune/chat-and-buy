import {
  GET_USERNAME,
  GET_MESSAGE,
  GET_MESSAGE_LIST,
  CLEAN_NO_READ,
  SET_CURRENT_LIST
} from "./type";
import { fromJS } from "immutable";

import axios from "axios";
import history from "../common/history";
import { Toast } from "antd-mobile";
import io from "socket.io-client";
import { filterNoReadCount } from "../common/unit";

let socket = "";

export function connectSocket() {
  return (dispatch, state) => {
    socket = io("http://localhost:3001");
    socket.on("connect", () => {
      socket.emit("user", state().get("user").get("id"));
      // socket.emit("sendMessage", { from: state().get("user").get("id"), to:"5b607ea0fd5d57e83805fda2", message:"hello" });
    });

    socket.on("userName", userName => {
      if (userName) {
        dispatch({ type: GET_USERNAME, payload: userName });
      } else {
        history.push("/messageList");
      }
    });

    socket.on("message", data => {
      console.log(data);
      dispatch(getMessageSuccess(data));
    });

    socket.on("ServerError", msg => {
      Toast.info(msg.errorMsg, 2);
      history.push("/messageList");
    });
  };
}

export function cleanNoRead(readId, messageId) {
  return async (dispath, getState) => {
    try {
      const res = await axios.post("/chat/cleanNoRead", { readId, messageId });
      if (res.status === 200 && res.data.code === 0) {
        const chat = getState().get("chat");
        const index = chat
          .get("messageList")
          .findIndex(v => v.get("messageId") === messageId);
        const noReadCounts = chat.get("noReadCounts");
        const readCount = noReadCounts.get(index);
        dispath({
          type: CLEAN_NO_READ,
          noReadCounts: chat.get("noReadCounts").set(index, 0),
          readCount
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export function getMessageList() {
  return async (dispatch, state) => {
    try {
      const res = await axios.post("/chat/getMessageList");

      if (res.status === 200 && res.data.code ===0) {
        
        const id = state()
          .get("user")
          .get("id");
        const data = fromJS(res.data.data);
        dispatch({
          type: GET_MESSAGE_LIST,
          payload: data,
          userId: id,
          noReadCounts: fromJS(filterNoReadCount(id, data))
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export function getUserName(id) {
  return dispatch => {
    socket.emit("getUserName", id);
  };
}

export function setCurrentChatList(obj, messageId) {
  return { type: SET_CURRENT_LIST, payload: obj, messageId };
}

export function sendMessage(to, message) {
  return (dispatch, state) => {
    const id = state().get("user").get("id");
    const payload = {
      from: id,
      to,
      message,
      date: Date()
    };
    dispatch(getMessageSuccess(payload));
    socket.emit("sendMessage", { from: id, to, message });
  };
}

function getMessageSuccess(payload) {
  return (dispatch, getState) => {
    const state = getState();
    let chatUserName;

    if (payload.obj) {
      chatUserName = payload.name;
      payload = payload.obj;
    }

    const list = state.get("chat").get("messageList");

    const messageId = [payload.from, payload.to].sort().join("");

    const isNoRead = payload.from === state.get("user").get("id") ? 0 : 1;

    let index = list.findIndex(v => {
      return v.get("messageId") === messageId;
    });

    const noReadCounts = state.get("chat").get("noReadCounts");
    if (index > -1) {
      let currentList = list.update(index, item => {
        let oldItem = item.get("messages");
        oldItem = oldItem.push(fromJS(payload));
        return item.set("messages", oldItem);
      });

      const currentChatList = currentList.find(
        v => v.get("messageId") === messageId
      );

      const oldItem = currentList.get(index);
      currentList = currentList.delete(index).insert(0, oldItem);
      dispatch({
        type: GET_MESSAGE,
        messageList: currentList,
        isNoRead,
        noReadCounts: noReadCounts.set(
          index,
          noReadCounts.get(index) + isNoRead
        ),
        currentChatList: currentChatList
          ? currentChatList.get("messages")
          : state.get("chat").get("currentChatList")
      });
    } else {
      const obj = {
        messageId,
        bothSide: [
          { user: payload.from, name: chatUserName },
          { user: payload.to, name: state.get("user").get("user") }
        ],
        messages: [payload]
      };

      let currentChatList = state.get("chat").get("currentChatList");
      if (messageId === state.get("chat").get("currentMessageId")) {
        currentChatList = currentChatList.set(0, fromJS(payload));
      }
      dispatch({
        type: GET_MESSAGE,
        messageList: list.unshift(fromJS(obj)),
        isNoRead,
        noReadCounts: noReadCounts.unshift(isNoRead),
        currentChatList: currentChatList
      });
    }
  };
}
