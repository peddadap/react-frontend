import React from "react";
import Dropzone from 'react-dropzone';
import { FormGroup, ControlLabel, Col, FormControl } from "react-bootstrap";
import DatePicker from "react-bootstrap-date-picker";

export default class Vestings extends React.Component {

  constructor() {
    super()
    this.state = {
      parentCo: '',
      childCo: '',
      controlAcct: '',
      totalShares: '',
      vestingDate: '',
    }
  }

  async componentWillReceiveProps () {
    if( this.props.dataforvestings ) {
      this.setState({
        parentCo: this.props.dataforvestings.parentCo,
        childCo: this.props.dataforvestings.childCo,
        controlAcct: this.props.dataforvestings.controlAcct,
        totalShares: this.props.dataforvestings.totalShares,
      });
      this.refs.myTextInputparentCo.value = this.state.parentCo;
      this.refs.myTextInputchildCo.value = this.state.childCo;
      this.refs.myTextInputcontrolAcct.value = this.state.controlAcct;
      this.refs.myTextInputtotalShares.value = this.state.totalShares;
    }
  }

  render() {
    return (
        <div>
          <FormGroup controlId="parentCo" style={{ 'margin-bottom': '10px' }}> 
            <Col componentClass={ControlLabel} sm={3}>Parent Company No #</Col>
            <Col sm={6} smoffset={3}>
              <FormControl name="parentCo" onChange={ this.handleChange } type="text" ref="myTextInputparentCo" defaultValue={ this.state.parentCo } onBlur={ this.handleChange } disabled={ this.state.fielddisabled }/>
            </Col>
          </FormGroup>
          <FormGroup controlId="childCo" style={{ 'margin-bottom': '10px' }}>
            <Col componentClass={ControlLabel} sm={3}>Child Company No #</Col>
            <Col sm={6} smoffset={3}>
              <FormControl name="childCo" onChange={ this.handleChange } type="text" ref="myTextInputchildCo" defaultValue={ this.state.childCo } onBlur={ this.handleChange } disabled={ this.state.fielddisabled }/>
            </Col>
          </FormGroup>
          <FormGroup controlId="controlAcct" style={{ 'margin-bottom': '10px' }}>
            <Col componentClass={ControlLabel} sm={3}>Control Account No #</Col>
            <Col sm={6} smoffset={3}>
              <FormControl name="controlAcct" onChange={ this.handleChange } type="text"  ref="myTextInputcontrolAcct" defaultValue={ this.state.controlAcct } onBlur={ this.handleChange } disabled={ this.state.fielddisabled }/>
            </Col>
          </FormGroup>
          <FormGroup controlId="totalShares" style={{ 'margin-bottom': '10px' }}>
            <Col componentClass={ControlLabel} sm={3}>Total Shares #</Col>
            <Col sm={6} smoffset={3}>
              <FormControl name="totalShares" onChange={ this.handleChange } type="text"  ref="myTextInputtotalShares" defaultValue={ this.state.totalShares } onBlur={ this.handleChange } disabled={ this.state.fielddisabled }/>
            </Col>
          </FormGroup>
          <FormGroup controlId="vestingDate" style={{ 'margin-bottom': '10px' }}>
            <Col componentClass={ControlLabel} sm={3}>Vesting Date</Col>
            <Col sm={6} smoffset={3}>
              <DatePicker name="vestingDate" id="vestingDate" value={ this.state.value } onChange={ this.handleChangeDate }  disabled={ this.state.fielddisabled }/>
            </Col>
          </FormGroup>                    
        </div>
    );
  }

}
