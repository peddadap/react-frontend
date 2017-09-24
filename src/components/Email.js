import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, Col} from "react-bootstrap";
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
              <Col componentClass={ControlLabel} sm={3}>To:</Col>
              <Col sm={6}>
                <FormControl onChange={this.handleChange} type="text" />
              </Col>
              <Col smoffset={3}></Col>
          </FormGroup>
          <FormGroup controlId="CC">
              <Col componentClass={ControlLabel} sm={3}>Copy:</Col>
              <Col sm={6}>
                <FormControl onChange={this.handleChange} type="text" />
              </Col>
              <Col smoffset={3}></Col>              
          </FormGroup>
          <FormGroup controlId="Subject">
              <Col componentClass={ControlLabel} sm={3}>Subject:</Col>
              <Col sm={6}>
                <FormControl onChange={this.handleChange} type="text" />
              </Col>
              <Col smoffset={3}></Col> 
          </FormGroup>
          <FormGroup controlId="Body">
              <Col componentClass={ControlLabel} sm={3}>Body:</Col>
              <Col sm={6}>
                <FormControl componentClass="textarea" placeholder="textarea" bssize="large"/>
              </Col>
              <Col smoffset={3}></Col> 
          </FormGroup>
          </div>
     );
  }
}
