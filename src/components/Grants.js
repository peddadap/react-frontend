import React from "react";
import Dropzone from 'react-dropzone';
import { FormGroup, ControlLabel, Col, FormControl } from "react-bootstrap";
import DatePicker from "react-bootstrap-date-picker";

export default class Grants extends React.Component {

  constructor() {
    super()
    this.state = {
      parentCo: '',
      childCo: '',
      controlNo: '',
      totalShares: '',
      controlAcct: '',
      issuanceDate: '',
    }
  }

  async componentWillReceiveProps () {
    if( this.props.dataforgrants ) {
      this.setState({
        parentCo: this.props.dataforgrants.parentCo,
        childCo: this.props.dataforgrants.childCo,
        controlNo: this.props.dataforgrants.controlNo,
        totalShares: this.props.dataforgrants.totalShares,
        controlAcct: this.props.dataforgrants.controlAcct,
        issuanceDate: this.props.dataforgrants.issuanceDate,
      });
      this.refs.myTextInputparentCo.value = this.state.parentCo;
      this.refs.myTextInputchildCo.value = this.state.childCo;
      this.refs.myTextInputcontrolNo.value = this.state.controlNo;
      this.refs.myTextInputtotalShares.value = this.state.totalShares;
      this.refs.myTextInputcontrolAcct.value = this.state.controlAcct;
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
        <FormGroup controlId="controlNo" style={{ 'margin-bottom': '10px' }}>
          <Col componentClass={ControlLabel} sm={3}>Control No #</Col>
          <Col sm={6} smoffset={3}>
            <FormControl name="controlNo" onChange={ this.handleChange } type="text" ref="myTextInputcontrolNo" defaultValue={ this.state.controlNo } onBlur={ this.handleChange } disabled={ this.state.fielddisabled }/>
          </Col>
        </FormGroup>
        <FormGroup controlId="totalShares" style={{ 'margin-bottom': '10px' }}>
          <Col componentClass={ControlLabel} sm={3}>Total Shares #</Col>
          <Col sm={6} smoffset={3}>
            <FormControl name="totalShares" onChange={ this.handleChange } type="text" ref="myTextInputtotalShares" defaultValue={ this.state.totalShares } onBlur={ this.handleChange } disabled={ this.state.fielddisabled }/>
          </Col>
        </FormGroup>
        <FormGroup controlId="controlAcct" style={{ 'margin-bottom': '10px' }}>
          <Col componentClass={ControlLabel} sm={3}>Control Account No #</Col>
          <Col sm={6} smoffset={3}>
            <FormControl name="controlAcct" onChange={ this.handleChange } type="text" ref="myTextInputcontrolAcct" defaultValue={ this.state.controlAcct } onBlur={ this.handleChange } disabled={ this.state.fielddisabled }/>
          </Col>
        </FormGroup>
        <FormGroup controlId="issuanceDate" style={{ 'margin-bottom': '10px' }}>
          <Col componentClass={ControlLabel} sm={3}>Issuance Date</Col>
          <Col sm={6} smoffset={3}>
            <DatePicker id="issuanceDate" name="issuanceDate" onChange={ this.handleChangeDate } value={ this.state.value } disabled={ this.state.fielddisabled }/>
          </Col>
        </FormGroup>
      </div>
    );
  }

}
