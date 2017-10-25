import React from "react";
import Dropzone from 'react-dropzone';
import { FormGroup, ControlLabel, Col, FormControl } from "react-bootstrap";
import DatePicker from "react-bootstrap-date-picker";

export default class Grants extends React.Component {

  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <FormGroup controlId="parentCo" style={{ 'margin-bottom': '10px' }}> 
          <Col componentClass={ControlLabel} sm={3}>Parent Company No #</Col>
          <Col sm={6} smoffset={3}>
            <FormControl onChange={this.handleChange} type="text" />
          </Col>
        </FormGroup>
        <FormGroup controlId="childCo" style={{ 'margin-bottom': '10px' }}>
          <Col componentClass={ControlLabel} sm={3}>Child Company No #</Col>
          <Col sm={6} smoffset={3}>
            <FormControl onChange={this.handleChange} type="text" />
          </Col>
        </FormGroup>
        <FormGroup controlId="controlNo" style={{ 'margin-bottom': '10px' }}>
          <Col componentClass={ControlLabel} sm={3}>Control No #</Col>
          <Col sm={6} smoffset={3}>
            <FormControl onChange={this.handleChange} type="text" />
          </Col>
        </FormGroup>
        <FormGroup controlId="totalshares" style={{ 'margin-bottom': '10px' }}>
          <Col componentClass={ControlLabel} sm={3}>Total Shares #</Col>
          <Col sm={6} smoffset={3}>
            <FormControl onChange={this.handleChange} type="text" />
          </Col>
        </FormGroup>
        <FormGroup controlId="controlAcct" style={{ 'margin-bottom': '10px' }}>
          <Col componentClass={ControlLabel} sm={3}>Control Account No #</Col>
          <Col sm={6} smoffset={3}>
            <FormControl onChange={this.handleChange} type="text" />
          </Col>
        </FormGroup>
        <FormGroup controlId="issuancedate" style={{ 'margin-bottom': '10px' }}>
          <Col componentClass={ControlLabel} sm={3}>Issuance Date</Col>
          <Col sm={6} smoffset={3}>
            <DatePicker id="issuancedate" onChange={this.handleChangeDate} />
          </Col>
        </FormGroup>
      </div>
    );
  }

}
