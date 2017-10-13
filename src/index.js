//import modules
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

//Load Application Components
import App from "./containers/App";
import registerServiceWorker from "./containers/registerServiceWorker";

//import config not needed here
//Not required here

//import data
//Not required here

//import CSS
import "./styles/index.css";

ReactDOM.render( <Router><App /></Router>, document.getElementById("root") );

registerServiceWorker();
