//import modules
import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button, FormGroup, Col, Form, ControlLabel, FormControl } from 'react-bootstrap';
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
    var today = new Date().toISOString();
    var onemonthago = new Date();
    onemonthago.setMonth( onemonthago.getMonth() - 1);
    var old = onemonthago.toISOString();
    this.state = {
      isLoading: true,
      tickets: [],
      cellvalue: '',
      cellvalueTo: [],
      rowid: 0,
      currentPage: 1,
      toDate: today,
      fromDate: old, 
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
      <Form horizontal onSubmit={this.handleSubmit} ref="fetchDataByDate" inline>
        <FormGroup controlId="fromDate">
          <Col componentClass={ControlLabel} sm={6}>Creation Date From: </Col>
          <Col sm={6}><DatePicker id="fromDate"  value={ this.state.fromDate } onChange={ this.handleChange }/></Col> 
        </FormGroup>
        <FormGroup controlId="toDate">
          <Col componentClass={ControlLabel} sm={6}>Creation Date To: </Col>
          <Col sm={6}><DatePicker id="toDate" value={ this.state.toDate } onChange={ this.handleChange }/></Col>
        </FormGroup>
        <FormGroup controlId="fetchDataByDate">
          <Col sm={6}></Col>
          <Col sm={6}>
            <ControlLabel>
              <LoaderButton
                bsStyle="primary"
                disabled={!this.validateForm()}
                type="submit"
                isLoading={this.state.isLoading}
                text="Search"
                loadingText="Creating…"
              />
            </ControlLabel>
          </Col>
        </FormGroup>
      </Form>
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