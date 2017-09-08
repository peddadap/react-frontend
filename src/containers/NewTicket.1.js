import Dropzone from 'react-dropzone'
import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./NewTicket.css";

export default class NewTicket extends Component {
  constructor(props) {
    super(props);

    //this.file = null;

    this.state = { files: [] }
  }

  onDrop(files) {
    this.setState({
      files
    });
  }

  createTicket(){


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

   /* if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert("Please pick a file smaller than 5MB");
      return;
    }*/

    //this.setState({ isLoading: true });

    var myForm = document.getElementById('myForm');
    var formData = new FormData();
    formData.append('files',this.state.files);
    await fetch('/ticket/new/', {
      method: 'POST',
      body: formData
    }).then(function(result){console.log('result of ticket:'+result)})
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="NewNote">
        <form  id = 'myForm' onSubmit={this.handleSubmit} encType='multipart/form-data'>
          <FormGroup controlId="ticketType">
            <ControlLabel>Ticket Type</ControlLabel>
            <FormControl componentClass="select" placeholder="select"  onChange={this.handleChange}>
              <option value="Original">Original Issuance</option>
              <option value="Surrender">Surrender</option>
          </FormControl>
          </FormGroup>
          <FormGroup controlId="priority">
            <ControlLabel>Priority</ControlLabel>
            <FormControl onChange={this.handleChange} type="text" />
          </FormGroup>
          <FormGroup controlId="parentCo">
            <ControlLabel>Parent Company No #</ControlLabel>
            <FormControl onChange={this.handleChange} type="text" />
          </FormGroup>
          <FormGroup controlId="clildCo">
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
            <ControlLabel>attachment</ControlLabel>
            <FormControl onChange={this.handleFileChange} type="file" />
          </FormGroup>
          <section>
            <div className="dropzone">
              <Dropzone onDrop={this.onDrop.bind(this)}>
                <p>Try dropping some files here, or click to select files to upload.</p>
              </Dropzone>
            </div>
            <aside>
              <h2>Dropped files</h2>
              <ul>
                {
                  this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                }
            </ul>
            </aside>
          </section>
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
      </div>
    );
  }
}