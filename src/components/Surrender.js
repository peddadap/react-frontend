import React from "react";
import Dropzone from 'react-dropzone';
import { FormGroup, ControlLabel, Col, FormControl } from "react-bootstrap";
import DatePicker from "react-bootstrap-date-picker";

export default class Surender extends React.Component {

  constructor() {
    super()
    this.state = {
      companyno: '',
      totalshares: '',
      issuancedate: '',
      disposition: '',
    }
  }

  async componentWillReceiveProps () {
    if( this.props.dataforsurrender ) {
      this.setState({
        companyno: this.props.dataforsurrender.companyno,
        totalshares: this.props.dataforsurrender.totalshares,
        disposition: this.props.dataforsurrender.disposition,
      });
      this.refs.myTextInputcompanyno.value = this.state.companyno;
      this.refs.myTextInputtotalshares.value = this.state.totalshares;
      this.refs.myTextInputdisposition.value = this.state.disposition;
    }
  }

  render() {
    return (
        <div>
          <FormGroup controlId="companyno" style={{ 'margin-bottom': '10px' }}>
            <Col componentClass={ControlLabel} sm={3}>Company No #</Col>
            <Col sm={6} smoffset={3}>
              <FormControl onChange={ this.handleChange } type="text"  ref="myTextInputcompanyno" defaultValue={ this.state.companyno } onBlur={ this.handleChange } disabled={ this.state.fielddisabled }/>
            </Col>
          </FormGroup>
          <FormGroup controlId="totalshares" style={{ 'margin-bottom': '10px' }}>
            <Col componentClass={ControlLabel} sm={3}>Total Shares #</Col>
            <Col sm={6} smoffset={3}>
              <FormControl onChange={ this.handleChange } type="text"  ref="myTextInputtotalshares" defaultValue={ this.state.totalshares } onBlur={ this.handleChange } disabled={ this.state.fielddisabled }/>
            </Col>
          </FormGroup>
          <FormGroup controlId="issuancedate" style={{ 'margin-bottom': '10px' }}>
            <Col componentClass={ControlLabel} sm={3}>Date</Col>
            <Col sm={6} smoffset={3}>
              <DatePicker id="issuancedate" value={ this.state.value } onChange={ this.handleChangeDate }  disabled={ this.state.fielddisabled }/>
            </Col>
          </FormGroup>
          <FormGroup controlId="disposition" style={{ 'margin-bottom': '10px' }}>
            <Col componentClass={ControlLabel} sm={3}>Disposition</Col>
            <Col sm={6} smoffset={3}>
              <FormControl bsSize ="small" componentClass="select" placeholder="select" onChange={ this.handleChange } disabled={ this.state.fielddisabled }>
                <option value="retire">Retire</option>
                <option value="return">Return to Company Treasury</option>
              </FormControl>
            </Col>
          </FormGroup>
        </div>
    );
  }

}
