import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, Col} from "react-bootstrap";
import "./Email.css";

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
          <FormGroup controlId="To" style={{ 'margin-bottom': '10px' }}>
              <Col componentClass={ControlLabel} sm={3}>To:</Col>
              <Col sm={6} smoffset={3}>
                <FormControl onChange={this.handleChange} type="text" />
              </Col>
          </FormGroup>
          <FormGroup controlId="CC" style={{ 'margin-bottom': '10px' }}>
              <Col componentClass={ControlLabel} sm={3}>Copy:</Col>
              <Col sm={6} smoffset={3}>
                <FormControl onChange={this.handleChange} type="text" />
              </Col>
          </FormGroup>
          <FormGroup controlId="Subject" style={{ 'margin-bottom': '10px' }}>
              <Col componentClass={ControlLabel} sm={3}>Subject:</Col>
              <Col sm={6} smoffset={3}>
                <FormControl onChange={this.handleChange} type="text" />
              </Col>
          </FormGroup>
          <FormGroup controlId="Body" style={{ 'margin-bottom': '10px' }}>
              <Col componentClass={ControlLabel} sm={3}>Body:</Col>
              <Col sm={6} smoffset={3}>
                <FormControl componentClass="textarea" placeholder="textarea" bssize="large" bsClass="mytextClass"/>
              </Col>
          </FormGroup>
          </div>
     );
  }
}
