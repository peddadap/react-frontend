import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Button} from 'react-bootstrap';
import "./Home.css";
import jsonMyTicketData from "../myTickets.json";

export default class MyTickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      tickets: []
    };
    this.options = {
      defaultSortName: 'ID',  // default sort column name
      defaultSortOrder: 'asc'  // default sort order
    };
  }
  
  async componentDidMount() {
    try {
      this.setState({ tickets: jsonMyTicketData });
    } catch (e) {
      alert(e);
    }
  
    this.setState({ isLoading: false });
  }
 
  colFormatter = (cell, row) => {
    return (
      <Link to={"/ticket/"+cell}>
        {cell}
      </Link>
    )
  }

  dateFormatter(cell, row){
    var cdate = cell.split('T')[0];
    return cdate;
  }
  
  imageFormatter = (cell, row) => {
   if (cell == 'created')
    return (<Button  bsStyle="primary" bsSize="small">&nbsp;&nbsp;&nbsp;Submit&nbsp;&nbsp;&nbsp;</Button>);
   else
    if(cell == 'error')
      return (<Button bsStyle="danger" bsSize="small" onClick={ () => this.props.handleToUpdate('3') }>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Error&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button>);
    else
      return   (<Button bsStyle="success" bsSize="small">Completed</Button>);
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
        <TableHeaderColumn dataField='ID' isKey headerAlign='left' dataAlign='left' dataSort sortFunc={ this.numericSortFunc }>Request ID</TableHeaderColumn>
        <TableHeaderColumn dataField='ParentCompany' headerAlign='left' dataAlign='left' dataSort>Company No </TableHeaderColumn>
        <TableHeaderColumn dataField='Type' headerAlign='left' dataAlign='left' dataSort>Ticket Type</TableHeaderColumn>
        <TableHeaderColumn dataField='Priority' headerAlign='left' dataAlign='left' dataSort>Priority</TableHeaderColumn>
        <TableHeaderColumn dataField='CreatedDate' headerAlign='left' dataAlign='left' dataFormat={this.dateFormatter} dataSort>Created Date</TableHeaderColumn>
        <TableHeaderColumn dataField='SubmittedDate' headerAlign='left' dataAlign='left' dataFormat={this.dateFormatter} dataSort>Submitted Date</TableHeaderColumn>
        <TableHeaderColumn dataField='UpdatedBy' headerAlign='left' dataAlign='left' dataSort>Updated By</TableHeaderColumn>
        <TableHeaderColumn dataField='Status' headerAlign='left' dataAlign='left' dataFormat={this.imageFormatter} dataSort >Status</TableHeaderColumn>
      </BootstrapTable>
    )
  }

  
 }