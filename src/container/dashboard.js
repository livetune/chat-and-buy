import React from "react";
import { NavBar, TabBar } from "antd-mobile";
import { connect } from "react-redux";
import { getInfo } from "../actions/user";
import { Switch, Route, Redirect } from "react-router-dom";
import { connectSocket, getMessageList, sendMessage } from "../actions/chat";
import asyncComponent from "../asyncComponent";
const Message = asyncComponent(() => import("./message"));
const Goods = asyncComponent(() => import("./goods"));
const My = asyncComponent(() => import("./my"));
const Chat = asyncComponent(() => import("./chat"));
const list = [
  // {
  //   title: "订单",
  //   path: "/allOrders",
  //   type: "customer",
  //   component: "",
  //   imgName: "order"
  // },
  {
    title: "商品",
    path: "/goods",
    type: "deliver",
    component: Goods,
    imgName: "goods"
  },
  {
    title: "消息",
    path: "/messageList",
    component: Message,
    imgName: "message"
  },
  {
    title: "我的",
    path: "/me",
    component: My,
    imgName: "user"
  }
];
@connect(
  state => ({
    user: state.get("user"),
    noReadCount: state.get("chat").get("noReadCount")
  }),
  {
    getInfo,
    connectSocket,
    getMessageList,
    sendMessage
  }
)
class DashBoard extends React.Component {
  componentDidMount() {
    const { user, history, connectSocket } = this.props;
    if (window.localStorage.getItem("token")) {
      console.log(user.get("type"));
      if (!user.get("type")) {
        this.props.getInfo();
      } else {
        connectSocket();
      }
    } else {
      history.push("/login");
    }
    this.props.getMessageList();
  }
  
  render() {
    const { user, location, history, noReadCount } = this.props;
    const type = user.get("type");
    const path = user.get("path");

    if (!user.get("type")) {
      this.props.getInfo();
      return null;
    } else {
      connectSocket();
    }

    if (!type) {
      return null;
    } else if (path && location.pathname === "/") {
      return <Redirect to={path} />;
    }
    let currentNavBar = list.find(v => v.path === location.pathname);
    return (
      <div>
        {currentNavBar ? (
          <NavBar className="nav">{currentNavBar.title}</NavBar>
        ) : null}
        <Switch>
          {list.map(v => (
            <Route exact key={v.path} path={v.path} component={v.component} />
          ))}

          <Route path="/chat/:id" component={Chat} />
        </Switch>
        <div className="dashBoard-wrapper">
          <TabBar hidden={!currentNavBar}>
            {list.filter(v => v.type !== type).map(v => (
              <TabBar.Item
                icon={{ uri: require(`../images/${v.imgName}.png`) }}
                selectedIcon={{
                  uri: require(`../images/${v.imgName}-sel.png`)
                }}
                badge={v.path === "/messageList" && noReadCount}
                title={v.title}
                key={v.title}
                selected={location.pathname === v.path}
                onPress={() => {
                  history.push(v.path);
                }}
              />
            ))}
          </TabBar>
        </div>
      </div>
    );
  }
}

export default DashBoard;
