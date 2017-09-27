import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, Col} from "react-bootstrap";
import jsonEditOICoreData from "../EditOICore.json";

export default class EditOICore extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  async componentDidMount() {
   }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  
  render(){
    return(
        <div>
            <FormGroup controlId="ticketType">
                <Col componentClass={ControlLabel} sm={3}>Ticket Type</Col>
                <Col sm={6}>
                    <FormControl bsSize ="small" componentClass="select" placeholder="select" onChange={this.handleChange}>
                        <option value="Original">Original Issuance</option>
                        <option value="Grants">Grants</option>
                        <option value="Vestings">Vestings</option>
                        <option value="Terminations">Terminations</option>
                    </FormControl>
                </Col>
                <Col smoffset={3}></Col>
            </FormGroup>
            <FormGroup controlId="priority">
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
            <FormGroup controlId="parentCo">
                <Col componentClass={ControlLabel} sm={3}>Parent Company No #</Col>
                <Col sm={6}>
                    <FormControl onChange={this.handleChange} type="text" value={jsonEditOICoreData[0].ParentCompany}/>
                </Col>
                <Col smoffset={3}></Col>
            </FormGroup>
            <FormGroup controlId="childCo">
                <Col componentClass={ControlLabel} sm={3}>Child Company No #</Col>
                <Col sm={6}>
                    <FormControl onChange={this.handleChange} type="text"  value={jsonEditOICoreData[0].ChildCompany}/>
                </Col>
                <Col smoffset={3}></Col>
            </FormGroup>
            <FormGroup controlId="controlAcct">
                <Col componentClass={ControlLabel} sm={3}>Control Account No #</Col>
                <Col sm={6}>
                    <FormControl onChange={this.handleChange} type="text"   value={jsonEditOICoreData[0].controlaccount}/>
                </Col>
                <Col smoffset={3}></Col>
            </FormGroup>
            <FormGroup controlId="TreasuryAcct">
                <Col componentClass={ControlLabel} sm={3}>Treasury Account No #</Col>
                <Col sm={6}>
                    <FormControl onChange={this.handleChange} type="text"   value={jsonEditOICoreData[0].treasureaccount}/>
                </Col>
                <Col smoffset={3}></Col>
            </FormGroup>
        </div>
     );
  }
}
