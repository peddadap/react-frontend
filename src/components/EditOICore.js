import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, Col } from "react-bootstrap";
import jsonEditOICoreData from "../data/EditOICore.json";
import DatePicker from "react-bootstrap-date-picker";

import Original from './Original';
import Grants from './Grants';
import Vestings from './Vestings';
import Surrender from './Surrender';
import Terminations from './Terminations';

export default class EditOICore extends Component {

   constructor(props) {
    super(props);
    var value1 = new Date().toISOString();
    this.didSwitchParentObject = true;

    var datafororiginal = {
        companyno: jsonEditOICoreData[0].companyno,
        totalshares: jsonEditOICoreData[0].totalshares,
        legend: jsonEditOICoreData[0].legend,
    }

    var dataforgrants = {
      parentCo: jsonEditOICoreData[0].parentCo,
      childCo: jsonEditOICoreData[0].childCo,
      controlNo: jsonEditOICoreData[0].controlNo,
      totalshares: jsonEditOICoreData[0].totalshares,
      controlAcct: jsonEditOICoreData[0].controlAcct,
    }

    var dataforsurrender = {
      companyno: jsonEditOICoreData[0].companyno,
      totalshares: jsonEditOICoreData[0].totalshares,
      disposition: jsonEditOICoreData[0].disposition,
    }

    var dataforvestings = {
      parentCo: jsonEditOICoreData[0].parentCo,
      childCo: jsonEditOICoreData[0].childCo,
      controlAcct: jsonEditOICoreData[0].controlAcct,
      totalshares: jsonEditOICoreData[0].totalshares,
    }

    this.state = {
      value: value1,
      displayDate: 'Issue Date',
      shareno: 'Share #',
      showfields: 'Original',
      requestId: 1,
      fielddisabled: true,
      reqtypefielddisabled: true,
      fields: ( <Original datafororiginal={ this.datafororiginal } /> ),
    }
  }

  async componentWillReceiveProps () {
    if(this.props.requestId) {
      this.setState({requestId: this.props.requestId + 1,});
    }else{
      this.setState({requestId: 1,});
    }

    if(this.props.requestStatus && 
        ( this.props.requestStatus['cell'] == 'Open' || 
        this.props.requestStatus['cell'] == 'Error' )
    ) {
      this.setState({fielddisabled: false,});
    } else {
      this.setState({fielddisabled: true,});
    }

    if(this.props.requestStatus && this.props.requestStatus['cell'] == 'Error' ) {
      this.setState({reqtypefielddisabled: false,});
    } else {
      this.setState({reqtypefielddisabled: true,});
    }    
  }

  handleChangeDate(value, formattedValue) {
    this.setState({
      value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z" 
      formattedValue: formattedValue, // Formatted String, ex: "11/19/2016" 
    });
  }

  handleChange = event => {
    if(event.target.id == 'ticketType') {
      if(event.target.value == 'Vestings')
        this.setState({
          fields:  ( <Vestings dataforvestings={ this.dataforvestings } /> ) ,
        })
      else
        if(event.target.value === 'Terminations')
          this.setState({
            fields:  ( <Terminations dataforterminations={ this.dataforterminations } /> ) ,
          })
        else
          if(event.target.value === 'Grants')
            this.setState({
              fields:  ( <Grants dataforgrants={ this.dataforgrants } /> ),
            })
        else
          if(event.target.value === 'Surrender')
            this.setState({
              fields:  ( <Surrender dataforsurrender={ this.dataforsurrender }/> ) ,
            })
          else 
            this.setState({
              fields: ( <Original datafororiginal={ this.datafororiginal } /> ),
            })
    }
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  
  render() {
    return(
      <div>
        <FormGroup controlId="ticketType" style={{ 'margin-bottom': '10px' }}>
          <Col componentClass={ControlLabel} sm={3}>Request Number</Col>
          <Col sm={6} smoffset={3}><h4>{ this.state.requestId }</h4></Col>
        </FormGroup>
        <FormGroup controlId="ticketType" style={{ 'margin-bottom': '10px' }}>
          <Col componentClass={ControlLabel} sm={3}>Request Type</Col>
          <Col sm={6} smoffset={3}>
            <FormControl name="ticketType" bsSize ="small" componentClass="select" placeholder="select" onChange={this.handleChange} disabled={ this.state.reqtypefielddisabled }>
              <option value="Original">Original Issuance</option>
              <option value="Grants">Grants</option>
              <option value="Vestings">Vestings</option>
              <option value="Terminations">RSP Termination</option>
              <option value="Surrender">Surrender</option>
              <option value="DRCash">DR Cash</option>
              <option value="ProxyFiling">Proxy Filing</option>
            </FormControl>
          </Col>
        </FormGroup>
        <FormGroup controlId="priority" style={{ 'margin-bottom': '10px' }}>
          <Col componentClass={ControlLabel} sm={3}>Priority</Col>
          <Col sm={6} smoffset={3}>
            <FormControl name="priority" componentClass="select" placeholder="select" onChange={this.handleChange} disabled={ this.state.fielddisabled }>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </FormControl>
          </Col>
        </FormGroup>
        <FormGroup controlId="adminGroup" style={{ 'margin-bottom': '10px' }}> 
                <Col componentClass={ControlLabel} sm={3}>Admin Group</Col>
                <Col sm={6} smoffset={3}>
                    <FormControl name="adminGroup" type="text" ref="myTextInputadminGroup"  defaultValue={ jsonEditOICoreData[0].adminGroup } onChange={this.handleChange} disabled={ this.state.fielddisabled }/>
                </Col>
            </FormGroup>
        { this.state.fields }
      </div>
    );
  }

}
