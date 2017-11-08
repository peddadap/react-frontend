import React from "react";
import Dropzone from 'react-dropzone';
import { FormGroup, ControlLabel, Col, FormControl } from "react-bootstrap";
import DatePicker from "react-bootstrap-date-picker";

export default class Original extends React.Component {

  constructor() {
    super()
    this.state = {
      companyNo: '',
      totalShares: '',
      legend: '',
      issuanceDate: '',
      bookEntry: '',
    }
  }

  async componentWillReceiveProps () {
    if( this.props.datafororiginal ) {
      this.setState({
        companyNo: this.props.datafororiginal.companyNo,
        totalShares: this.props.datafororiginal.totalShares,
        legend: this.props.datafororiginal.legend,
      });
      this.refs.myTextInputtotalShares.value = this.state.totalShares;
      this.refs.myTextInputcompanyNo.value = this.state.companyNo;
      this.refs.myTextInputlegend.value = this.state.legend;
    }
  }

  render() {
    return (
      <div>
        <FormGroup controlId="companyNo" style={{ 'margin-bottom': '10px' }}>
          <Col componentClass={ControlLabel} sm={3}>Company #</Col>
          <Col sm={6} smoffset={3}>
            <FormControl name="companyNo" onChange={this.handleChange} type="text" ref="myTextInputcompanyNo" defaultValue={ this.state.companyNo } onBlur = {this.handleChange} disabled={ this.state.fielddisabled }/>
          </Col>
        </FormGroup>
        <FormGroup controlId="totalShares" style={{ 'margin-bottom': '10px' }}>
          <Col componentClass={ControlLabel} sm={3}>Total Shares #</Col>
          <Col sm={6} smoffset={3}>
            <FormControl name="totalShares" onChange={this.handleChange} type="text"  ref="myTextInputtotalShares" defaultValue={ this.state.totalShares } onBlur = {this.handleChange} disabled={ this.state.fielddisabled }/>
          </Col>
        </FormGroup>
        <FormGroup controlId="legend" style={{ 'margin-bottom': '10px' }}>
          <Col componentClass={ControlLabel} sm={3}>Legend</Col>
          <Col sm={6} smoffset={3}>
            <FormControl name="legend" onChange={this.handleChange} type="text" maxLength="1" ref="myTextInputlegend" defaultValue={ this.state.legend } onBlur = {this.handleChange} disabled={ this.state.fielddisabled }/>
          </Col>
        </FormGroup>
        <FormGroup controlId="issuanceDate" style={{ 'margin-bottom': '10px' }}>
          <Col componentClass={ControlLabel} sm={3}>Issuance Date</Col>
          <Col sm={6}  smoffset={3}>
            <DatePicker name="issuanceDate" id="issuanceDate" onChange={ this.handleChangeDate } value={this.state.value} disabled={ this.state.fielddisabled }/>
          </Col>
        </FormGroup>
        <FormGroup controlId="bookEntry" style={{ 'margin-bottom': '10px' }}>
          <Col componentClass={ControlLabel} sm={3}>Book Entry</Col>
          <Col sm={6} smoffset={3}>
            <FormControl name="bookEntry" bsSize ="small" componentClass="select" placeholder="select" onChange={this.handleChange} disabled={ this.state.fielddisabled }>
              <option value="B">Book</option>
              <option value="P">Physical</option>
            </FormControl>
          </Col>
        </FormGroup>
      </div>
    );
  }

}
