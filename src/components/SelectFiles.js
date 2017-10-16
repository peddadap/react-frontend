import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, Col } from "react-bootstrap";
import configStatusOptions from "../configurations/ticketStatusConfig";

export default class StatusOptions extends Component {

  constructor(props) {
    super(props);
    this.state = { 
        statusOptions: '',
     }
  }

  async componentWillReceiveProps () {
   
  }

  handleStatusChange = event => {
    var filefordata = [ {name: event.target.value, status: true} ];
    this.props.getDataToDisplay(filefordata);
  }

  render() {
    var attachementListShow=[];
    Object.keys(this.props.ticketDataArr).map((k, index) => {
      attachementListShow.push(<option value={ this.props.ticketDataArr[k]['value'] }>{ this.props.ticketDataArr[k]['name'] }</option>);
    });
    return(
      <FormGroup controlId="attachment" style={{ 'margin-bottom': '10px' }}>
        <Col componentClass={ControlLabel} sm={3}>Existing Attachments</Col>
        <Col sm={6}>
          <FormControl bsSize ="small" componentClass="select" placeholder="select" onChange={this.handleStatusChange}>
            { attachementListShow }
          </FormControl>
        </Col>
        <Col smoffset={3}></Col>
      </FormGroup>
    );
  }
}
