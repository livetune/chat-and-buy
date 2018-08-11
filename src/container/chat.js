import React, { Component } from "react";
import { List, InputItem } from "antd-mobile";
import ChatList from "../components/message/chatList";
import NavBar from "../components/navBar/backNavBar";

import {
  cleanNoRead,
  getUserName,
  sendMessage,
  setCurrentChatList,
  getMessageList
} from "../actions/chat";

import { connect } from "react-redux";

@connect(
  state => ({ chat: state.get("chat") }),
  {
    cleanNoRead,
    getUserName,
    sendMessage,
    setCurrentChatList,
    getMessageList
  }
)
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    console.log(this.props.chat);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    if (this.state.value.trim()) {
      this.props.sendMessage(this.props.match.params.id, this.state.value);
      this.setState({ value: "" });
    }
  }

  componentDidMount() {
    this.id = this.props.match.params.id;
    const { chat } = this.props;
    const messageId = [chat.get("userId"), this.id].sort().join("");
    const messageList = chat.get("messageList");
    if (messageList) {
      let currentList = messageList.find(v => v.get("messageId") === messageId);
      this.props.setCurrentChatList(currentList, messageId);
      this.props.getUserName(this.id);
      window.scrollTo(0, document.body.scrollHeight);
    } else {
      console.log("getMessage");
      this.props.getMessageList(); // get message list from server
    }
  }
  componentWillUnmount() {
    // clear no read in this message

    const { chat } = this.props;
    const currentChatList = chat.get("currentChatList");
    const currentMessageId = chat.get("currentMessageId");
    if (currentChatList.isEmpty()) {
      return;
    }
    let last = currentChatList.findLast(v => {
      return v.get("to") === chat.get("userId");
    });
    if (last) {
      this.props.cleanNoRead(last.get("_id"), currentMessageId);
    }
  }
  render() {
    const { chat, history } = this.props;
    const userName = chat.get("userName");

    return (
      <div>
        {!!userName && <NavBar title={userName} backClick={history.goBack} />}
        <ChatList
          currentChatList={chat.get("currentChatList")}
          userId={chat.get("userId")}
        />
        <div className="bottom-input">
          <List style={{ width: "100%" }}>
            <InputItem
              placeholder="请输入信息"
              autoFocus={true}
              value={this.state.value}
              onChange={value => this.setState({ value })}
              extra={<span>发送</span>}
              onExtraClick={this.handleSubmit}
            />
          </List>
        </div>
      </div>
    );
  }
}
export default Chat;
