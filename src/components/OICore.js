import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, Col} from "react-bootstrap";
import DatePicker from "react-bootstrap-date-picker";

import Original from './Original';
import Grants from './Grants';
import Vestings from './Vestings';
import Surrender from './Surrender';
import Terminations from './Terminations';

export default class OICore extends Component {

  constructor(props) {
    super(props);
    var value1 = new Date().toISOString();
    this.state = {
        value: value1,
        displayDate: 'Issue Date',
        shareno: 'Share #',
        fields: ( <Original /> ),
     }
  }

  handleChangeDate(value, formattedValue) {
    this.setState({
      value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z" 
      formattedValue: formattedValue, // Formatted String, ex: "11/19/2016" 
    });
  }

  handleChange = event => {
    if(event.target.id == 'ticketType' ) {
        if(event.target.value == 'Vestings')
            this.setState({
                fields:  ( <Vestings /> ) ,
            })
        else
            if(event.target.value == 'Terminations')
                this.setState({
                    fields:  ( <Terminations /> ) ,
                })
            else
                if(event.target.value == 'Grants')
                    this.setState({
                        fields:  ( <Grants /> ),
                    })
                else
                    if(event.target.value == 'Surrender')
                        this.setState({
                            fields:  ( <Surrender /> ) ,
                        })
                    else 
                        this.setState({
                            fields: ( <Original /> ),
                        })

    }
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  
  render(){
    return(
        <div>
            <FormGroup controlId="ticketType" style={{ 'margin-bottom': '10px' }}>
                <Col componentClass={ControlLabel} sm={3}>Request Type</Col>
                <Col sm={6}>
                    <FormControl bsSize ="small" componentClass="select" placeholder="select" onChange={this.handleChange}>
                        <option value="Original">Original Issuance</option>
                        <option value="Grants">Grants</option>
                        <option value="Vestings">Vestings</option>
                        <option value="Terminations">RSP Termination</option>
                        <option value="Surrender">Surrender</option>
                    </FormControl>
                </Col>
                <Col smoffset={3}></Col>
            </FormGroup>
            <FormGroup controlId="priority" style={{ 'margin-bottom': '10px' }}>
                <Col componentClass={ControlLabel} sm={3}>Priority</Col>
                <Col sm={6}>
                    <FormControl componentClass="select" placeholder="select" onChange={this.handleChange}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </FormControl>
                </Col>
                <Col smoffset={3}></Col>
            </FormGroup>
            { this.state.fields }
        </div>
     );
  }
}
