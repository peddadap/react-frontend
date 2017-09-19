import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./NewTicket.css";

export default class NewTicket extends Component {
  constructor(props) {
    super(props);
    console.log('New Ticket Has Access to Props');
    console.log(props);
    //this.file = null;

    this.state = {

      priority:"Low",
      ticketType:"Orginial Issuance",
     }
  }
    
 
  validateForm() {
    return true;
    //return this.state.content.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = event => {
    this.setState({
      [event.target.id]: event.target.files[0]
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert("Please pick a file smaller than 1MB");
      return;
    }
    if(this.state.parentCo && this.state.parentCo === '') {
      alert("Please enter a value for Parent Company No #");
      return;
    }
    if(this.state.childCo && this.state.childCo === '') {
      alert("Please enter a value for Child Company No #");
      return;
    }
    if(this.state.controlAcct && this.state.controlAcct === '') {
      alert("Please enter a value for Control Account No #");
      return;
    }
    if(this.state.TreasuryAcct && this.state.TreasuryAcct === '') {
      alert("Please enter a value for Treasury Account No #");
      return;
    }
    this.setState({ isLoading: true });
    var formData = new FormData();
    formData.append('company_number', this.state.parentCo);
    formData.append('child_company_number',this.state.childCo);
    formData.append('control_account_number',this.state.controlAcct);
    formData.append('treasure_account_number',this.state.TreasuryAcct);
    formData.append('status','New');
    formData.append('file',this.state.file);
    formData.append('ticketType',this.state.ticketType);
    formData.append('priority',this.state.priority);
    await fetch('/ticket/new/', {
      method: 'POST',
      body: formData
    }).then(function(result){})
    this.setState({ isLoading: false });
    this.props.move2Tab(1);
    //alert("New Order Created")

   }

  render() {
    //console.log(">>>>>>>>>>>>.. New Ticket Rendered");
    return (
  
        <form  onSubmit={this.handleSubmit}>
          <FormGroup controlId="ticketType">
            <ControlLabel>Ticket Type</ControlLabel>
            <FormControl componentClass="select" placeholder="select"  onChange={this.handleChange}>
              <option value="Original">Original Issuance</option>
              <option value="Grants">Grants</option>
              <option value="Vestings">Vestings</option>
              <option value="Terminations">Terminations</option>
          </FormControl>
          </FormGroup>
          <FormGroup controlId="priority">
            <ControlLabel>Priority</ControlLabel>
              <FormControl componentClass="select" placeholder="select"  onChange={this.handleChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </FormControl>
        </FormGroup>
          <FormGroup controlId="parentCo">
            <ControlLabel>Parent Company No #</ControlLabel>
            <FormControl onChange={this.handleChange} type="text" />
          </FormGroup>
          <FormGroup controlId="childCo">
            <ControlLabel>Child Company No #</ControlLabel>
            <FormControl onChange={this.handleChange} type="text" />
          </FormGroup>
          <FormGroup controlId="controlAcct">
            <ControlLabel>Control Account No #</ControlLabel>
            <FormControl onChange={this.handleChange} type="text"/>
          </FormGroup>
          <FormGroup controlId="TreasuryAcct">
            <ControlLabel>Treasury Account No #</ControlLabel>
            <FormControl onChange={this.handleChange} type="text" />
          </FormGroup>
          <FormGroup controlId="file">
            <ControlLabel>Attachment</ControlLabel>
            <FormControl onChange={this.handleFileChange} type="file" />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />
        </form>
    );
  }
}