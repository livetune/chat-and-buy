import React from "react";
import { connect } from "react-redux";
import { getInfo } from "../actions/user";
@connect(
  state => ({
    user: state.get("user")
  }),
  {
    getInfo
  }
)
class DashBoard extends React.Component {
  componentDidMount() {
    const { user, history } = this.props;
    if (window.localStorage.getItem("token")) {
      if (!user.get("type")) {
        this.props.getInfo();
      } else {
      }
    } else {
      history.push("/login");
    }
  }

  render() {
    const { user } = this.props;
    const userText = user.get("user") ? user.get("user") : "暂未登陆";
    return (
      <div>
        DashBoard
        <div>you are {userText}</div>
      </div>
    );
  }
}

export default DashBoard;
