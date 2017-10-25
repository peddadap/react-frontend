//import modules
import React, { Component } from "react";
// import { Link } from 'react-router-dom'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button } from 'react-bootstrap';

//import config not needed here
//Not required here

//import data
import jsonMyTicketData from "../data/myTickets.json";

//import CSS
import "../styles/MyTickets.css";

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
    };
    this.options = {
      defaultSortName: 'ID',  // default sort column name
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
    var cdate = cell.split('T')[0];
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
                      '3', (row.ID - 1), { cell } 
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
      return Number(b.ID) - Number(a.ID);
    } else {
      return Number(a.ID) - Number(b.ID);
    }
  }

  render(tickets){

    const selectRow = {
      mode: 'checkbox',
      showOnlySelected: true
    };

    const options = {
      toolBar: this.createCustomToolBar,
      defaultSortName: 'ID',  // default sort column name
      defaultSortOrder: 'asc'  // default sort order
    };

    return(
      <BootstrapTable data={this.state.tickets } striped={true} hover={true} pagination options = {options } selectRow={ selectRow }  exportCSV search>
        <TableHeaderColumn dataField='ID' isKey headerAlign='center' dataAlign='center' dataSort sortFunc={ this.numericSortFunc }>Request ID</TableHeaderColumn>
        <TableHeaderColumn dataField='ParentCompany' headerAlign='left' dataAlign='left' dataSort>Company No </TableHeaderColumn>
        <TableHeaderColumn dataField='Type' headerAlign='left' dataAlign='left' dataSort>Request Type</TableHeaderColumn>
        <TableHeaderColumn dataField='Priority' headerAlign='left' dataAlign='left' dataSort>Priority</TableHeaderColumn>
        <TableHeaderColumn dataField='CreatedDate' headerAlign='left' dataAlign='left' dataFormat={this.dateFormatter} dataSort>Created Date</TableHeaderColumn>
        <TableHeaderColumn dataField='SubmittedDate' headerAlign='left' dataAlign='left' dataFormat={this.dateFormatter} dataSort>Submitted Date</TableHeaderColumn>
        <TableHeaderColumn dataField='UpdatedBy' headerAlign='left' dataAlign='left' dataSort>Updated By</TableHeaderColumn>
        <TableHeaderColumn dataField='Status' headerAlign='center' dataAlign='center' dataFormat={this.imageFormatter} dataSort >Status</TableHeaderColumn>
      </BootstrapTable>
    )
  }

}