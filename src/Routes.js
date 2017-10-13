//import modules
import React from "react";
import { Route, Switch } from "react-router-dom";

//Load Application Components
import Home from "./containers/Home.js";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";

//import config not needed here
//Not required here

//import data
//Not required here

//import CSS
//Not required here

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/home" exact component={Home} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;