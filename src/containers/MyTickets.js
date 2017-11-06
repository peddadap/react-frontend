//import modules
import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button, FormGroup, Col, Form, ControlLabel, FormControl, Modal } from 'react-bootstrap';
import DatePicker from "react-bootstrap-date-picker";

//import config
import LoaderButton from "../components/LoaderButton";

//import data
import jsonMyTicketData from "../data/myTickets.json";

//import CSS
import "../styles/MyTickets.css";
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

//MyTickets Class
export default class MyTickets extends Component {

  //Constructor
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      tickets: [],
      cellvalue: '',
      cellvalueTo: [],
      rowid: 0,
      currentPage: 1,
      showModal: false,
    };
    this.options = {
      defaultSortName: 'id',  // default sort column name
      defaultSortOrder: 'asc'  // default sort order
    };
  }

  async componentWillReceiveProps () {
    if( this.props.actTab && 
        this.props.actTab === 1 && 
        this.props.requestId && 
        this.props.requestStatus 
    ) {
      this.updateticketswithstate( this.props.requestId, this.props.requestStatus );
    }
  }
  
  async componentDidMount() {
    try {
      this.setState({ tickets: jsonMyTicketData });
    } catch (e) {
      alert(e);
    }
    this.setState({ isLoading: false });
  }
 
  dateFormatter( cell, row ){
    var cdate = cell;
    if( cell ) cdate = cell.split('T')[0];
    return cdate;
  }

  updateticketswithstate( row, newstate ){
    var cloneArrayone = JSON.parse(JSON.stringify(this.state.tickets));
    cloneArrayone[row].Status = newstate;
    this.setState({ tickets: cloneArrayone });
  }

  getbuttonforstatus = (mystyle, cell, row ) => {
    if(cell === 'New') {
      return (
        <Button
            bsStyle={mystyle} 
            bsSize="small" 
            className="myTicketsButton"
            disabled
        >
          { cell }
        </Button>);
    } else {
      return (
        <Button 
            bsStyle={mystyle} 
            bsSize="small" 
            className="myTicketsButton" 
            onClick={ 
              () => this.props.handleToUpdate(
                      '3', (row.id - 1), { cell } 
                    ) 
            } 
        >
          { cell }
        </Button>);
    }
  }

  imageFormatter = ( cell, row ) => {
    var statusButton='';
    if( cell === 'Error' || cell === 'Recall' || cell === 'Hold' ) {
      statusButton = this.getbuttonforstatus('danger', cell, row );
    } else {
      if( cell === 'Done' || cell === 'Open' || cell === 'In-Progress' )
        statusButton = this.getbuttonforstatus('warning', cell, row );
      else
        statusButton = this.getbuttonforstatus('success', cell, row );
    }
    return statusButton;
  }

  createCustomToolBar = props => {
    return (
      <div style={ { margin: '15px' } }>
        { props.components.btnGroup }
        <div className='col-xs-8 col-sm-4 col-md-4 col-lg-2'>
          { props.components.searchPanel }
        </div>
      </div>
    );
  }

  numericSortFunc(a, b, order) {
    if (order === 'desc') {
      return Number(b.id) - Number(a.id);
    } else {
      return Number(a.id) - Number(b.id);
    }
  }

  validateForm(){ 
    return true; 
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.props.handleToUpdate('2');
    return;
  }

  handleChange(date) {
    console.log('Event data: '+date);
  }

  closeModal() {
    this.setState({ showModal: false, });
  }

  openModal() {
    this.setState({ showModal: true, });
  }

  submitModal() {
    this.setState({ showModal: false, });
  }

  render(tickets){

    const selectRow = {
      mode: 'checkbox',
      showOnlySelected: true
    };

    const options = {
      toolBar: this.createCustomToolBar,
      defaultSortName: 'id',  // default sort column name
      defaultSortOrder: 'asc',  // default sort order
      sizePerPageList: [ 25, 50, 100, 200, 500 ],
      sizePerPage: 25,
    };

    return(
      <div>
        <br />
        <div className="modal-container">
          <Button bsStyle="primary" bsSize="small" onClick={this.openModal.bind(this)}>
            Requests: Advanced Search
          </Button>
          <Modal show={this.state.showModal} onHide={this.closeModal.bind(this)} dialogClassName="searchModal">
            <Modal.Header closeButton>
              <Modal.Title>Search Requests</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form horizontal onSubmit={this.handleSubmit}>
                <FormGroup controlId="ticketStatus" style={{ 'margin-bottom': '10px' }}>
                  <Col componentClass={ControlLabel} sm={3}>Request Status</Col>
                  <Col sm={9}>
                    <FormControl bsSize ="small" componentClass="select" placeholder="select">
                      <option value="">All</option>
	          				  <option value="New">New</option>
					            <option value="Open">Open</option>
					            <option value="Pending">Pending</option>
					            <option value="Error">Error</option>
					            <option value="Recall">Recall</option>
					            <option value="In-Progress">In-Progress</option>
					            <option value="Hold">Hold</option>
					            <option value="Done">Done</option>
					            <option value="Closed">Closed</option>
                    </FormControl>
                  </Col>
                </FormGroup>
                <FormGroup controlId="ticketType" style={{ 'margin-bottom': '10px' }}>
                  <Col componentClass={ControlLabel} sm={3}>Request Type</Col>
                  <Col sm={9}>
                    <FormControl bsSize ="small" componentClass="select" placeholder="select">
                      <option value="">All</option>
                      <option value="Original">Original Issuance</option>
                      <option value="Grants">Grants</option>
                      <option value="Vestings">Vestings</option>
                      <option value="Terminations">RSP Termination</option>
                      <option value="Surrender">Surrender</option>
                    </FormControl>
                  </Col>
                </FormGroup>
                <FormGroup controlId="priority" style={{ 'margin-bottom': '10px' }}>
                  <Col componentClass={ControlLabel} sm={3}>Priority</Col>
                  <Col sm={9}>
                    <FormControl componentClass="select" placeholder="select">
                      <option value="">All</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </FormControl>
                  </Col>
                </FormGroup>
                <FormGroup controlId="requestId" style={{ 'margin-bottom': '10px' }}>
                  <Col componentClass={ControlLabel} sm={3}>Request Id</Col>
                  <Col sm={9}>
                    <FormControl onChange={ this.handleChange } type="text"  ref="myTextInputrequestId" />
                  </Col>
                </FormGroup>
                <FormGroup controlId="companyno" style={{ 'margin-bottom': '10px' }}>
                  <Col componentClass={ControlLabel} sm={3}>Company No #</Col>
                  <Col sm={9}>
                    <FormControl onChange={ this.handleChange } type="text"  ref="myTextInputcompanyno" />
                  </Col>
                </FormGroup>
                <FormGroup controlId="updatedBy" style={{ 'margin-bottom': '10px' }}>
                  <Col componentClass={ControlLabel} sm={3}>Updated By</Col>
                  <Col sm={9}>
                    <FormControl onChange={ this.handleChange } type="text"  ref="myTextInputupdatedBy" />
                  </Col>
                </FormGroup>              
                <FormGroup controlId="creationDate" style={{ 'margin-bottom': '10px' }}>
                  <Col componentClass={ControlLabel} sm={3}>Creation Date From: </Col>
                  <Col sm={3}><DatePicker id="fromCreationDate"/></Col> 
                  <Col componentClass={ControlLabel} sm={3}>Creation Date To: </Col>
                  <Col sm={3}><DatePicker id="toCreationDate"/></Col>
                </FormGroup>
                <FormGroup controlId="submittedDate" style={{ 'margin-bottom': '10px' }}>
                  <Col componentClass={ControlLabel} sm={3}>Submitted Date From: </Col>
                  <Col sm={3}><DatePicker id="fromSubmittedDate"/></Col> 
                  <Col componentClass={ControlLabel} sm={3}>Submitted Date To: </Col>
                  <Col sm={3}><DatePicker id="toSubmittedDate"/></Col>
                </FormGroup>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.closeModal.bind(this)}>Close</Button>
              <Button onClick={this.submitModal.bind(this)} bsStyle="primary">Submit</Button>
            </Modal.Footer>
          </Modal>
        </div>
        <hr /> 
        <BootstrapTable data={ this.state.tickets } striped={true} hover={true} pagination options = {options } selectRow={ selectRow }  exportCSV search>
          <TableHeaderColumn dataField='id' isKey headerAlign='center' dataAlign='center' dataSort sortFunc={ this.numericSortFunc }>Request ID</TableHeaderColumn>
          <TableHeaderColumn dataField='parentCompany' headerAlign='left' dataAlign='left' dataSort>Company No </TableHeaderColumn>
          <TableHeaderColumn dataField='type' headerAlign='left' dataAlign='left' dataSort>Request Type</TableHeaderColumn>
          <TableHeaderColumn dataField='priority' headerAlign='left' dataAlign='left' dataSort>Priority</TableHeaderColumn>
          <TableHeaderColumn dataField='createdDate' headerAlign='left' dataAlign='left' dataFormat={this.dateFormatter} dataSort>Created Date</TableHeaderColumn>
          <TableHeaderColumn dataField='submittedDate' headerAlign='left' dataAlign='left' dataFormat={this.dateFormatter} dataSort>Submitted Date</TableHeaderColumn>
          <TableHeaderColumn dataField='updatedBy' headerAlign='left' dataAlign='left' dataSort>Updated By</TableHeaderColumn>
          <TableHeaderColumn dataField='status' headerAlign='center' dataAlign='center' dataFormat={this.imageFormatter} dataSort>Status</TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }

}