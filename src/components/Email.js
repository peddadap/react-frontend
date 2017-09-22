import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
//import jsonData from "../data.json";
//import Config from "./ux.json";

export default class Email extends Component {

  constructor(props) {
    super(props);
    this.state = {
     }
  }

  async componentDidMount() {
   }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  render(){
 
   return(
          <div>
          <FormGroup controlId="To">
              <ControlLabel>TO:</ControlLabel>
              <FormControl onChange={this.handleChange} type="text" />
          </FormGroup>
          <FormGroup controlId="CC">
              <ControlLabel>CC:</ControlLabel>
              <FormControl onChange={this.handleChange} type="text" />
          </FormGroup>
          <FormGroup controlId="Subject">
              <ControlLabel>Subject:</ControlLabel>
              <FormControl onChange={this.handleChange} type="text" />
          </FormGroup>
          <FormGroup controlId="Body">
          <ControlLabel>Body</ControlLabel>
          <FormControl componentClass="textarea" placeholder="textarea" />
        </FormGroup>
      </div>
     );
  }
}
