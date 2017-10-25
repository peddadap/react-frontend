//import modules
import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, Col} from "react-bootstrap";
import validator from 'validator';

//Load Application Components
//not needed here

//import config 
//not needed here

//import data
//not needed here

//import CSS
import "../styles/Email.css";

//Email Class 
export default class Email extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toFieldStatus: null,
      copyFieldStatus: null,
      subjectFieldStatus: null,
    }
  }

  handleChange = event => {

    if( event.target.id === 'To' ) {
      if( !validator.isEmpty(event.target.value) && validator.isEmail(event.target.value) ) {
        this.setState( {
          toFieldStatus: 'success',
        } );
      } else {
        this.setState( {
          toFieldStatus: 'error',
        } );
      }   
    }

    if( event.target.id === 'CC' ) {
      if( validator.isEmpty(event.target.value) || validator.isEmail(event.target.value) ) {
        this.setState( {
          copyFieldStatus: 'success',
        } );
      } else {
        this.setState( {
          copyFieldStatus: 'error',
        } );
      }   
    }

    if( event.target.id === 'Subject' ) {
      if( !validator.isEmpty(event.target.value) ) {
        this.setState( {
          subjectFieldStatus: 'success',
        } );
      } else {
        this.setState( {
          subjectFieldStatus: 'error',
        } );
      }   
    }

    this.setState( {
      [event.target.id]: event.target.value
    } );

  }

  render() {
    return(
      <div>
        <FormGroup controlId="To" style={{ 'margin-bottom': '10px' }} validationState={ this.state.toFieldStatus }>
          <Col componentClass={ControlLabel} sm={3}>To:</Col>
          <Col sm={6} smoffset={3}>
            <FormControl onBlur={this.handleChange} type="text"/>
          </Col>
        </FormGroup>
        <FormGroup controlId="CC" style={{ 'margin-bottom': '10px' }} validationState={ this.state.copyFieldStatus }>
          <Col componentClass={ControlLabel} sm={3}>Copy:</Col>
          <Col sm={6} smoffset={3}>
            <FormControl onBlur={this.handleChange} type="text" />
          </Col>
        </FormGroup>
        <FormGroup controlId="Subject" style={{ 'margin-bottom': '10px' }} validationState={ this.state.subjectFieldStatus }>
          <Col componentClass={ControlLabel} sm={3}>Subject:</Col>
          <Col sm={6} smoffset={3}>
            <FormControl onBlur={this.handleChange} type="text" />
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
