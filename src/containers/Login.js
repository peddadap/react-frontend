//import modules
import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

//Load Application Components
import LoaderButton from "../components/LoaderButton";

//import config not needed here
//Not required here

//import data
//Not required here

//import CSS
import "../styles/Login.css";

//Login Class
export default class Login extends Component {

  //Constructor
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: "",
      password: "",
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    try {
      console.log('1');
      await this.login(this.state.email, this.state.password);
      console.log('2');
      this.props.userHasAuthenticated(true);
      console.log('3');
      this.props.history.push("/home");
      console.log('4');
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }
  
  login(email, password) {
    return new Promise(function(resolve, reject){
      resolve();
    });
  }

  render() {
    return (
          <div className="Login">
            <form onSubmit={this.handleSubmit}>
              <FormGroup controlId="email" bsSize="large">
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  autoFocus
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="password" bsSize="large">
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                />
              </FormGroup>
              <LoaderButton
                block
                bsSize="large"
                disabled={!this.validateForm()}
                type="submit"
                isLoading={this.state.isLoading}
                text="Login"
                loadingText="Logging in…"
              />
            </form>
          </div>
    );
  }

}