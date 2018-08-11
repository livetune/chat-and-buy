import {
  GET_USERNAME,
  GET_MESSAGE,
  GET_MESSAGE_LIST,
  CLEAN_NO_READ,
  SET_CURRENT_LIST
} from "../actions/type";

import { Map, List } from "immutable";

const initialState = Map({
  chatUserName: "",
  currentChatList: List([]),
  currentMessageId: "",
  messageList: List([]),
  userId: "",
  noReadCount: 0,
  noReadCounts: List([])
});
function sortMessageList(list) {
  // 消息列表按时间顺序排序
  /**
   *  [
   *    {messages:[{message:"text",date:time}]},
   *    {messages:[{message:"text",date:time}]},
   *    {messages:[{message:"text",date:time}]},
   * ]
   *
   */
  return list.sort((a, b) => {
    return (
      a
        .get("messages")
        .get(-1) // 数组最后一个
        .get("date") <
      b
        .get("messages")
        .get(-1)
        .get("date")
    );
  });
}
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERNAME:
      return state.merge({ userName: action.payload });
    case GET_MESSAGE:
      return state.merge({
        messageList: action.messageList,
        noReadCount: state.get("noReadCount") + action.isNoRead,
        noReadCounts: action.noReadCounts,
        currentChatList: action.currentChatList
      });
    case GET_MESSAGE_LIST:
      return state.merge({
        messageList: sortMessageList(action.payload),
        userId: action.userId,
        noReadCounts: action.noReadCounts,
        noReadCount: action.noReadCounts.reduce((sum, value) => sum + value, 0)
      });
    case SET_CURRENT_LIST:
      return state.merge({
        currentChatList: action.payload
          ? action.payload.get("messages")
          : List([]),
        currentMessageId: action.messageId
      });
    case CLEAN_NO_READ:
      return state.merge({
        noReadCounts: action.noReadCounts,
        noReadCount: state.get("noReadCount") - action.readCount
      });
    default:
      return state;
  }
}
