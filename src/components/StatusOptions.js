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
    if( this.props.requestStatus ) {
      var status = this.props.requestStatus['cell'];
      if(status !== '' && status !== 'undefined' && status !== undefined ) {
        var statoption = [];
        if( configStatusOptions[status] ) {
          Object.keys( configStatusOptions[status] ).map((k, index) => {
            if( index === 0 ) {
              statoption.push(<option value={ configStatusOptions[status][k] } ></option>);
            } else {
              statoption.push(<option value={ configStatusOptions[status][k] }>{ configStatusOptions[status][k] }</option>);
            }
            return true;
          });
          this.setState({ statusOptions: statoption, });
        } else {
          this.setState({ statusOptions: '', });
        }
      }
    }   
  }

  handleStatusChange = event => {
    this.props.setStatusOfTicket( event.target.value );
  }

  render() {
    if(this.state.statusOptions !== '' && this.state.statusOptions.length > 1) {
      return(
        <div>
          <FormGroup controlId="statusChange" style={{ 'margin-bottom': '10px' }}>
            <Col componentClass={ControlLabel} sm={3}>Change Request Status</Col>
            <Col sm={6} smoffset={3}>
              <FormControl componentClass="select" placeholder="select" onLoad={ this.handleStatusChange } onChange={this.handleStatusChange}>
                { this.state.statusOptions }
              </FormControl>
            </Col>
          </FormGroup>
          <hr/>
        </div>
      );
    } else {
      return(null);
    }
  }
}
