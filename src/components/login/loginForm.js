import React from "react";
import { List, InputItem, WingBlank, WhiteSpace, Button } from "antd-mobile";
import PropTypes from "prop-types";
import lock_logo from "../../images/lock.svg";
import user_logo from "../../images/user.svg";
const LoginForm = ({ login, push, handleTextChange }) => (
  <div style={{ marginTop: "100px" }}>
    <WingBlank>
      <List>
        <InputItem
          labelNumber="4"
          placeholder="Username"
          onChange={env => handleTextChange("user", env)}
        >
          <img src={user_logo} alt="" />
        </InputItem>
        <WhiteSpace />
        <InputItem
          placeholder="Password"
          labelNumber="4"
          onChange={env => handleTextChange("pwd", env)}
          type="password"
        >
          <img src={lock_logo} alt="" />
        </InputItem>
      </List>
      <WhiteSpace />
      <Button type="primary" onClick={login}>
        登录
      </Button>
      <WhiteSpace />
      <div className="button-wrapper">
        <Button inline size="small" style={{ width: "100px" }} onClick={push}>
          注册
        </Button>
        <Button inline size="small" style={{ width: "100px", float: "right" }}>
          忘记密码
        </Button>
      </div>
    </WingBlank>
  </div>
);

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  handleTextChange: PropTypes.func.isRequired
};
export default LoginForm;
