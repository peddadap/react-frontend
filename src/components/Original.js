import React from "react";
import Dropzone from 'react-dropzone';
import { FormGroup, ControlLabel, Col, FormControl } from "react-bootstrap";
import DatePicker from "react-bootstrap-date-picker";

export default class Original extends React.Component {

  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <FormGroup controlId="companyno" style={{ 'margin-bottom': '10px' }}>
          <Col componentClass={ControlLabel} sm={3}>Company #</Col>
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
        <FormGroup controlId="legend" style={{ 'margin-bottom': '10px' }}>
          <Col componentClass={ControlLabel} sm={3}>Legend</Col>
          <Col sm={6} smoffset={3}>
            <FormControl onChange={this.handleChange} type="text" maxLength="1" />
          </Col>
        </FormGroup>
        <FormGroup controlId="issuancedate" style={{ 'margin-bottom': '10px' }}>
          <Col componentClass={ControlLabel} sm={3}>Issuance Date</Col>
          <Col sm={6}  smoffset={3}>
            <DatePicker id="issuancedate" onChange={ this.handleChangeDate } />
          </Col>
        </FormGroup>
        <FormGroup controlId="bookentry" style={{ 'margin-bottom': '10px' }}>
          <Col componentClass={ControlLabel} sm={3}>Book Entry</Col>
          <Col sm={6} smoffset={3}>
            <FormControl bsSize ="small" componentClass="select" placeholder="select" onChange={this.handleChange}>
              <option value="book">B</option>
              <option value="physical"> </option>
            </FormControl>
          </Col>
        </FormGroup>
      </div>
    );
  }

}
