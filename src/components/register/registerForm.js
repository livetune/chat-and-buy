import React from "react";
import {
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  Radio
} from "antd-mobile";
import PropTypes from "prop-types";

import lock_logo from "../../images/lock.svg";
import user_logo from "../../images/user.svg";
const RegisterForm = ({ register, radioData, handleTextChange, type }) => (
  <div style={{ marginTop: "100px" }}>
    <WingBlank>
      <List>
        <InputItem
          labelNumber="4"
          placeholder="Username"
          onChange={v => handleTextChange("user", v)}
        >
          <img src={user_logo} alt="" />
        </InputItem>
        <WhiteSpace />
        <InputItem
          labelNumber="4"
          placeholder="Password"
          onChange={v => handleTextChange("pwd", v)}
          type = "password"
        >
          <img src={lock_logo} alt="" />
        </InputItem>
        <WhiteSpace />
        {radioData.map(i => (
          <Radio.RadioItem
            key={i.type}
            checked={type === i.type}
            onChange={() => handleTextChange("type", i.type)}
          >
            {i.text}
          </Radio.RadioItem>
        ))}
      </List>
      <WhiteSpace />
      <Button type="primary" onClick={register}>
        注册
      </Button>
    </WingBlank>
  </div>
);

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired,
  radioData: PropTypes.array.isRequired,
  handleTextChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

export default RegisterForm;
