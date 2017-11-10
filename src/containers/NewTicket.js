//import modules
import React, { Component } from "react";
import { Form, FormGroup, Col } from "react-bootstrap";

//Load Application Components
import LoaderButton from "../components/LoaderButton";
import OICore from "../components/OICore";
import Attachments from "../components/Attachments";

//import config
import Config from "../configurations/ux.json";

//import data
//Not required here

//import CSS
import "../styles/NewTicket.css";

//NewTicket Class
export default class NewTicket extends Component {

  //Constructor
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
    // var rows = [];
    // let uxConfig = Config.oi;

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
      <Form horizontal onSubmit={this.handleSubmit} ref="createRequest" method="POST" id="createRequestID">
        <br/>
        <OICore/>
        <hr/>
        <Attachments/>
        <hr/>
        <br/>
        <FormGroup controlId="ticketTypeButtons">
          <Col sm={5}></Col>
          <Col sm={2}>
            <LoaderButton
              bsStyle="primary"
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Create"
              loadingText="Creating…"
            />
          </Col>
          <Col sm={5}></Col>
        </FormGroup>
        <br/>
      </Form>
    );
  }

}
