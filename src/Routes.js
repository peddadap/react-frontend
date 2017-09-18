import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home.js";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";

export default ({ childProps }) =>
<Switch>
  <AppliedRoute path="/home" exact component={Home} props={childProps} />
  <AppliedRoute path="/login" exact component={Login} props={childProps} />
  <AppliedRoute path="/ticket/:id" exact component={Home} props={childProps} />
  { /* Finally, catch all unmatched routes */ }
  <Route component={NotFound} />
</Switch>;