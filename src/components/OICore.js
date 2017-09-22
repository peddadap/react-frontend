import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
//import jsonData from "../data.json";
//import Config from "./ux.json";

export default class OICore extends Component {

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
          <FormGroup controlId="ticketType">
              <ControlLabel>Ticket Type</ControlLabel>
              <FormControl bsSize ="small" componentClass="select" placeholder="select" onChange={this.handleChange}>
                  <option value="Original">Original Issuance</option>
                  <option value="Grants">Grants</option>
                  <option value="Vestings">Vestings</option>
                  <option value="Terminations">Terminations</option>
              </FormControl>
          </FormGroup>
          <FormGroup controlId="priority">
              <ControlLabel>Priority</ControlLabel>
              <FormControl componentClass="select" placeholder="select" onChange={this.handleChange}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
              </FormControl>
          </FormGroup>
          <FormGroup controlId="parentCo">
              <ControlLabel>Parent Company No #</ControlLabel>
              <FormControl onChange={this.handleChange} type="text" />
          </FormGroup>
          <FormGroup controlId="childCo">
              <ControlLabel>Child Company No #</ControlLabel>
              <FormControl onChange={this.handleChange} type="text" />
          </FormGroup>
          <FormGroup controlId="controlAcct">
              <ControlLabel>Control Account No #</ControlLabel>
              <FormControl onChange={this.handleChange} type="text" />
          </FormGroup>
          <FormGroup controlId="TreasuryAcct">
              <ControlLabel>Treasury Account No #</ControlLabel>
              <FormControl onChange={this.handleChange} type="text" />
          </FormGroup>
      </div>
     );
  }
}
