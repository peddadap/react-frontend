import React, { Component } from "react";
//import { Link } from 'react-router-dom'
//import { PageHeader, ListGroup,ListGroupItem,Button,Nav,NavItem,Navbar,Tabs,Tab} from "react-bootstrap";
//import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import "./Home.css";
import { Form,FormGroup, FormControl, ControlLabel} from "react-bootstrap";
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
    /* if (!this.props.isAuthenticated) {
       return;
     }*/
   
     try {
       fetch('/issuances')
       .then(res => res.json())
       .then(ticketData => {
         this.setState({ ticketData });
       })
     } catch (e) {
       alert(e);
     }
   
     this.setState({ isLoading: false });
   }

  
  validateForm(){
    
  }

  render(tickets) {
    var rows = [];
    let uxConfig = Config.oi;
    const selectRowProp = {
      mode: 'checkbox',
      showOnlySelected: true,
     // onSelectAll: this.onSelectAll
    };
    let options = {
      insertModalHeader: this.createCustomModalHeader,
      //handleConfirmDeleteRow: this.customConfirm
    };
    const  cellEditProp = {
      mode: 'click',
      blurToSave: true,
      afterSaveCell: this.onAfterSaveCell
    }; 

    return(
      <Form horizontal onSubmit={this.handleSubmit}>
      <br/>
      <OICore></OICore>
      <hr/>
      <Email/>
      <ControlLabel>Attachments</ControlLabel>
      <Attachments/>
      <br/>
      <br/>
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
    </Form>
    );
  }
}
