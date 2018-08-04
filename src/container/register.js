import React from "react";
import { connect } from "react-redux";
import RegisterForm from "../components/register/registerForm";
import { register } from "../actions/user";

@connect(
  null,
  { register }
)
class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      user: "",
      pwd: "",
      type: "deliver"
    };
    this.redioData = [
      { type: "deliver", text: "送货员" },
      { type: "customer", text: "顾客" }
    ];
    this.handleRegister=this.handleRegister.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }
  handleTextChange(key, value) {
    this.setState({ [key]: value });
  }

  handleRegister() {
    this.props.register(this.state);
  }

  render() {
    return (
      <div>
        <RegisterForm
          register={this.handleRegister}
          radioData={this.redioData}
          handleTextChange={this.handleTextChange}
          type={this.state.type}
        />
      </div>
    );
  }
}

export default Register;
