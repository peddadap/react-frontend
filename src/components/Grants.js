import React from "react";
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
      parentCoStatus: '',
      childCoStatus: '',
      controlNoStatus: '',
      totalSharesStatus: '',
      controlAcctStatus: '',
      issuanceDateStatus: '',
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

  validateData = event => {
    if( event.target.id === 'parentCo' ||  
        event.target.id === 'childCo' || 
        event.target.id === 'controlNo' || 
        event.target.id === 'totalShares' || 
        event.target.id === 'controlAcct' || 
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
        <FormGroup controlId="parentCo" style={{ 'margin-bottom': '10px' }} validationState={ this.state.parentCoStatus }> 
          <Col componentClass={ControlLabel} sm={3}>Parent Company No #</Col>
          <Col sm={6} smoffset={3}>
            <FormControl name="parentCo" onChange={ this.handleChange } type="text" ref="myTextInputparentCo" defaultValue={ this.state.parentCo } onBlur = { this.validateData } disabled={ this.state.fielddisabled }/>
            <FormControl.Feedback />
          </Col>
        </FormGroup>
        <FormGroup controlId="childCo" style={{ 'margin-bottom': '10px' }} validationState={ this.state.childCoStatus }>
          <Col componentClass={ControlLabel} sm={3}>Child Company No #</Col>
          <Col sm={6} smoffset={3}>
            <FormControl name="childCo" onChange={ this.handleChange } type="text" ref="myTextInputchildCo" defaultValue={ this.state.childCo } onBlur = { this.validateData } disabled={ this.state.fielddisabled }/>
            <FormControl.Feedback />
          </Col>
        </FormGroup>
        <FormGroup controlId="controlNo" style={{ 'margin-bottom': '10px' }} validationState={ this.state.controlNoStatus }>
          <Col componentClass={ControlLabel} sm={3}>Control No #</Col>
          <Col sm={6} smoffset={3}>
            <FormControl name="controlNo" onChange={ this.handleChange } type="text" ref="myTextInputcontrolNo" defaultValue={ this.state.controlNo } onBlur = { this.validateData } disabled={ this.state.fielddisabled }/>
            <FormControl.Feedback />
          </Col>
        </FormGroup>
        <FormGroup controlId="totalShares" style={{ 'margin-bottom': '10px' }} validationState={ this.state.totalSharesStatus }>
          <Col componentClass={ControlLabel} sm={3}>Total Shares #</Col>
          <Col sm={6} smoffset={3}>
            <FormControl name="totalShares" onChange={ this.handleChange } type="text" ref="myTextInputtotalShares" defaultValue={ this.state.totalShares } onBlur = { this.validateData } disabled={ this.state.fielddisabled }/>
            <FormControl.Feedback />
          </Col>
        </FormGroup>
        <FormGroup controlId="controlAcct" style={{ 'margin-bottom': '10px' }} validationState={ this.state.controlAcctStatus }>
          <Col componentClass={ControlLabel} sm={3}>Control Account No #</Col>
          <Col sm={6} smoffset={3}>
            <FormControl name="controlAcct" onChange={ this.handleChange } type="text" ref="myTextInputcontrolAcct" defaultValue={ this.state.controlAcct } onBlur = { this.validateData } disabled={ this.state.fielddisabled }/>
            <FormControl.Feedback />
          </Col>
        </FormGroup>
        <FormGroup controlId="issuanceDate" style={{ 'margin-bottom': '10px' }} validationState={ this.state.issuanceDateStatus }>
          <Col componentClass={ControlLabel} sm={3}>Issuance Date</Col>
          <Col sm={6} smoffset={3}>
            <DatePicker id="issuanceDate" name="issuanceDate"  onBlur = { this.validateData } value={ this.state.value } disabled={ this.state.fielddisabled }/>
            <FormControl.Feedback />
          </Col>
        </FormGroup>
      </div>
    );
  }

}
