import React from "react";
import Dropzone from 'react-dropzone';
import { FormGroup, ControlLabel, Col, FormControl } from "react-bootstrap";
import DatePicker from "react-bootstrap-date-picker";

export default class Terminations extends React.Component {

  constructor() {
    super()
    this.state = {
      parentCo: '',
      childCo: '',
      controlNo: '',
      totalShares: '',
      issuanceDate: '',
      disposition: '',
    }
  }

  async componentWillReceiveProps () {
    if( this.props.dataforterminations ) {
      this.setState({
        parentCo: this.props.dataforterminations.parentCo,
        childCo: this.props.dataforterminations.childCo,
        controlNo: this.props.dataforterminations.controlNo,
        totalShares: this.props.dataforterminations.totalShares,
        disposition: this.props.dataforterminations.disposition,
      });
      this.refs.myTextInputparentCo.value = this.state.parentCo;
      this.refs.myTextInputchildCo.value = this.state.childCo;
      this.refs.myTextInputcontrolNo.value = this.state.controlNo;
      this.refs.myTextInputtotalShares.value = this.state.totalShares;
      this.refs.myTextInputdisposition.value = this.state.disposition;
    }
  }

  render() {
    return (
        <div>
          <FormGroup controlId="parentCo" style={{ 'margin-bottom': '10px' }}> 
            <Col componentClass={ControlLabel} sm={3}>Parent Company No #</Col>
            <Col sm={6} smoffset={3}>
              <FormControl name="parentCo" onChange={ this.handleChange } type="text"  ref="myTextInputparentCo" defaultValue={ this.state.parentCo } onBlur={ this.handleChange } disabled={ this.state.fielddisabled }/>
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
          <FormGroup controlId="issuanceDate" style={{ 'margin-bottom': '10px' }}>
            <Col componentClass={ControlLabel} sm={3}>Date</Col>
            <Col sm={6} smoffset={3}>
              <DatePicker name="issuanceDate" id="issuanceDate" value={ this.state.value } onChange={ this.handleChangeDate }  disabled={ this.state.fielddisabled }/>
            </Col>
          </FormGroup>
          <FormGroup controlId="disposition" style={{ 'margin-bottom': '10px' }}>
            <Col componentClass={ControlLabel} sm={3}>Disposition</Col>
            <Col sm={6} smoffset={3}>
              <FormControl name="disposition" bsSize ="small" componentClass="select" placeholder="select" onChange={ this.handleChange } disabled={ this.state.fielddisabled }>
                <option value="retire">Retire</option>
                <option value="return">Return to Company Treasury</option>
              </FormControl>
            </Col>
          </FormGroup>                 
        </div>
    );
  }
  
}
