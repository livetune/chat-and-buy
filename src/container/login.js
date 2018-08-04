import React from "react";
import { connect } from "react-redux";
import LoginForm from "../components/login/loginForm";
import { login } from "../actions/user";

@connect(
  null,
  { login }
)
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user: "",
      pwd: ""
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handlePush = this.handlePush.bind(this);
    this.handleTextChange =this.handleTextChange.bind(this);
  }
  handleTextChange(key, value) {
    this.setState({
      [key]: value
    });
  }
  handleLogin() {
    console.log(this.props)
    this.props.login(this.state);
  }
  handlePush() {
    this.props.history.push("register");
  }
  render() {
    return (
      <div>
        <LoginForm
          push={this.handlePush}
          login={this.handleLogin}
          handleTextChange={this.handleTextChange}
        />
      </div>
    );
  }
}

export default Login;
