import React from "react";
import Dropzone from 'react-dropzone';
import { FormGroup, ControlLabel, Col, FormControl } from "react-bootstrap";
import DatePicker from "react-bootstrap-date-picker";

export default class Original extends React.Component {

  constructor() {
    super()
    this.state = {
      companyno: '',
      totalshares: '',
      legend: '',
      issuancedate: '',
      bookentry: '',
    }
  }

  async componentWillReceiveProps () {
    if( this.props.datafororiginal ) {
      this.setState({
        companyno: this.props.datafororiginal.companyno,
        totalshares: this.props.datafororiginal.totalshares,
        legend: this.props.datafororiginal.legend,
      });
      this.refs.myTextInputtotalshares.value = this.state.totalshares;
      this.refs.myTextInputcompanyno.value = this.state.companyno;
      this.refs.myTextInputlegend.value = this.state.legend;
    }
  }

  render() {
    return (
      <div>
        <FormGroup controlId="companyno" style={{ 'margin-bottom': '10px' }}>
          <Col componentClass={ControlLabel} sm={3}>Company #</Col>
          <Col sm={6} smoffset={3}>
            <FormControl onChange={this.handleChange} type="text" ref="myTextInputcompanyno" defaultValue={ this.state.companyno } onBlur = {this.handleChange} disabled={ this.state.fielddisabled }/>
          </Col>
        </FormGroup>
        <FormGroup controlId="totalshares" style={{ 'margin-bottom': '10px' }}>
          <Col componentClass={ControlLabel} sm={3}>Total Shares #</Col>
          <Col sm={6} smoffset={3}>
            <FormControl onChange={this.handleChange} type="text"  ref="myTextInputtotalshares" defaultValue={ this.state.totalshares } onBlur = {this.handleChange} disabled={ this.state.fielddisabled }/>
          </Col>
        </FormGroup>
        <FormGroup controlId="legend" style={{ 'margin-bottom': '10px' }}>
          <Col componentClass={ControlLabel} sm={3}>Legend</Col>
          <Col sm={6} smoffset={3}>
            <FormControl onChange={this.handleChange} type="text" maxLength="1" ref="myTextInputlegend" defaultValue={ this.state.legend } onBlur = {this.handleChange} disabled={ this.state.fielddisabled }/>
          </Col>
        </FormGroup>
        <FormGroup controlId="issuancedate" style={{ 'margin-bottom': '10px' }}>
          <Col componentClass={ControlLabel} sm={3}>Issuance Date</Col>
          <Col sm={6}  smoffset={3}>
            <DatePicker id="issuancedate" onChange={ this.handleChangeDate } value={this.state.value} disabled={ this.state.fielddisabled }/>
          </Col>
        </FormGroup>
        <FormGroup controlId="bookentry" style={{ 'margin-bottom': '10px' }}>
          <Col componentClass={ControlLabel} sm={3}>Book Entry</Col>
          <Col sm={6} smoffset={3}>
            <FormControl bsSize ="small" componentClass="select" placeholder="select" onChange={this.handleChange} disabled={ this.state.fielddisabled }>
              <option value="book">B</option>
              <option value="physical"> </option>
            </FormControl>
          </Col>
        </FormGroup>
      </div>
    );
  }

}
