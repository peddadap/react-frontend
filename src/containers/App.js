//import modules
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, NavItem, Navbar } from "react-bootstrap";

//Load Application Components
import Routes from "../Routes";
import RouteNavItem from "../components/RouteNavItem.js";

//import config not needed here
//Not required here

//import data
//Not required here

//import CSS
import "../styles/App.css";

//App Class
class App extends Component {

  //Constructor  
  constructor(props) {
    super(props);
    this.state = {isAuthenticated: false};
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = event => {
    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  }
 
  render(){
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
    };

    return (
        <div className="App container">
          <Navbar fluid collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">Request Management System</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                {
                  this.state.isAuthenticated ? 
                  <NavItem onClick={this.handleLogout}>Logout</NavItem> : 
                  [ 
                    <RouteNavItem key={1} href="/signup">Signup</RouteNavItem>, 
                    <RouteNavItem key={2} href="/login">Login</RouteNavItem>
                  ]
                }
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Routes childProps={childProps} />
        </div>
    );
  }

}

export default withRouter(App);
