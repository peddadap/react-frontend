import React from "react";
import { FormGroup, ControlLabel, Col, FormControl } from "react-bootstrap";
import DatePicker from "react-bootstrap-date-picker";

export default class Surender extends React.Component {

  constructor() {
    super()
    this.state = {
      companyNo: '',
      totalShares: '',
      issuanceDate: '',
      disposition: '',
      companyNoStatus: '',
      totalSharesStatus: '',
      issuanceDateStatus: '',
    }
  }

  async componentWillReceiveProps () {
    if( this.props.dataforsurrender ) {
      this.setState({
        companyNo: this.props.dataforsurrender.companyNo,
        totalShares: this.props.dataforsurrender.totalShares,
        disposition: this.props.dataforsurrender.disposition,
      });
      this.refs.myTextInputcompanyNo.value = this.state.companyNo;
      this.refs.myTextInputtotalShares.value = this.state.totalShares;
      this.refs.myTextInputdisposition.value = this.state.disposition;
    }
  }

  validateData = event => {
    if( event.target.id === 'companyNo' ||  
        event.target.id === 'totalShares' || 
        event.target.id === 'issuanceDate' 
    ) {
      var tmp = event.target.id+'Status';
      if( event.target.value === '' ) {
        this.setState({[tmp]: 'error'});
      }else{
        this.setState({[tmp]: 'success'});
        if(event.target.id !== 'issuanceDate' && isNaN(event.target.value)) {
          this.setState({[tmp]: 'error'});
        }
      }
    }  
  }

  render() {
    return (
        <div>
          <FormGroup controlId="companyNo" style={{ 'margin-bottom': '10px' }} validationState={ this.state.companyNoStatus }>
            <Col componentClass={ControlLabel} sm={3}>Company No #</Col>
            <Col sm={6} smoffset={3}>
              <FormControl name="companyNo" onChange={ this.handleChange } type="text"  ref="myTextInputcompanyNo" defaultValue={ this.state.companyNo } onBlur={ this.validateData } disabled={ this.state.fielddisabled }/>
              <FormControl.Feedback />
            </Col>
          </FormGroup>
          <FormGroup controlId="totalShares" style={{ 'margin-bottom': '10px' }} validationState={ this.state.totalSharesStatus }>
            <Col componentClass={ControlLabel} sm={3}>Total Shares #</Col>
            <Col sm={6} smoffset={3}>
              <FormControl name="totalShares" onChange={ this.handleChange } type="text"  ref="myTextInputtotalShares" defaultValue={ this.state.totalShares } onBlur={ this.validateData } disabled={ this.state.fielddisabled }/>
              <FormControl.Feedback />
            </Col>
          </FormGroup>
          <FormGroup controlId="issuanceDate" style={{ 'margin-bottom': '10px' }} validationState={ this.state.issuanceDateStatus }>
            <Col componentClass={ControlLabel} sm={3}>Date</Col>
            <Col sm={6} smoffset={3}>
              <DatePicker name="issuanceDate" id="issuanceDate" value={ this.state.value } onChange={ this.handleChangeDate }  disabled={ this.state.fielddisabled } onBlur={ this.validateData } />
              <FormControl.Feedback />
            </Col>
          </FormGroup>
          <FormGroup controlId="disposition" style={{ 'margin-bottom': '10px' }}>
            <Col componentClass={ControlLabel} sm={3}>Disposition</Col>
            <Col sm={6} smoffset={3}>
              <FormControl name="disposition" bsSize="small" componentClass="select" placeholder="select" onChange={ this.handleChange } disabled={ this.state.fielddisabled }>
                <option value="retire">Retire</option>
                <option value="return">Return to Company Treasury</option>
              </FormControl>
            </Col>
          </FormGroup>
        </div>
    );
  }

}
