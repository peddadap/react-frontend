import React, { Component } from "react";
import "./Home.css";
import { Form } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import OICore from "../components/OICore";
import Attachments from "../components/Attachments";
import Email from "../components/Email";

//import jsonData from "../data.json";
import Config from "./ux.json";

export default class NewTicket extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      ticketData: []
     }
  }

  async componentDidMount() {
     this.setState({ isLoading: false });
   }

  
  validateForm(){
    return true;
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.props.handleToUpdate('1');
    return;

  }

  render(tickets) {
    var rows = [];
    let uxConfig = Config.oi;

    const selectRowProp = {
      mode: 'checkbox',
      showOnlySelected: true,
    };

    let options = {
      insertModalHeader: this.createCustomModalHeader,
    };

    const  cellEditProp = {
      mode: 'click',
      blurToSave: true,
      afterSaveCell: this.onAfterSaveCell
    };

    return(
      <Form horizontal onSubmit={this.handleSubmit} ref="createRequest">
      <br/>
      <Email/>
      <hr/>
      <OICore/>
      <hr/>
      <Attachments/>
      <hr/>
      <br/>
     <LoaderButton
        bsStyle="primary"
        bsSize="large"
        className = "myclassforbutton"
        disabled={!this.validateForm()}
        type="submit"
        isLoading={this.state.isLoading}
        text="Create"
        loadingText="Creating…"
      />
      <br/>
      <br/>
      </Form>
    );
  }
}
