import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Button} from 'react-bootstrap';
import "./Home.css";

export default class MyTickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      tickets: []
    };
    this.options = {
      defaultSortName: 'id',  // default sort column name
      defaultSortOrder: 'desc'  // default sort order
    };
  }
  
  async componentDidMount() {
   /* if (!this.props.isAuthenticated) {
      return;
    }*/
  
    try {
      fetch('/tickets')
      .then(res => res.json())
      .then(tickets => {
        this.setState({ tickets });
      })
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
   
   var cdate = (new Date(cell)).toISOString().split('T')[0]
   if (cdate.indexOf("1970") >= 0){
     return ' -- ';
   }
    else return  cdate;
  }
  
  imageFormatter(cell, row){
   // return (<img style={{width:50}} src=/>)
   if (cell == 'created')
    return (<Button  bsStyle="primary">Submit</Button>);
   else
    if(cell =='error')
      return (<Button bsStyle="danger">Error</Button>);
    else
      return   (<Button bsStyle="success">Completed</Button>);
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

  render(tickets){

    const selectRow = {
      mode: 'checkbox',
      showOnlySelected: true
    };
    const options = {
      toolBar: this.createCustomToolBar,
      defaultSortName: 'id',  // default sort column name
      defaultSortOrder: 'desc'  // default sort order
    };

    return(
      <BootstrapTable data={this.state.tickets } striped={true} hover={true} pagination options = {options } selectRow={ selectRow }  exportCSV search>
      <TableHeaderColumn dataField='ID' isKey headerAlign='left' dataAlign='left' dataFormat={ this.colFormatter } dataSort>Request ID</TableHeaderColumn>
      <TableHeaderColumn dataField='ParentCompany' headerAlign='left' dataAlign='left' dataSort>Company No </TableHeaderColumn>
      <TableHeaderColumn dataField='Type' headerAlign='left' dataAlign='left' dataSort>Ticket Type</TableHeaderColumn>
      <TableHeaderColumn dataField='Priority' headerAlign='left' dataAlign='left' dataSort>Priority</TableHeaderColumn>
      <TableHeaderColumn dataField='CreatedDate' headerAlign='left' dataAlign='left' dataFormat={this.dateFormatter} dataSort>Created Date</TableHeaderColumn>
      <TableHeaderColumn dataField='SubmittedDate' headerAlign='left' dataAlign='left' dataFormat={this.dateFormatter} dataSort>Submitted Date</TableHeaderColumn>
      <TableHeaderColumn dataField='Status' headerAlign='left' dataAlign='left' dataFormat={this.imageFormatter} dataSort >Status</TableHeaderColumn>
      </BootstrapTable>
    )
  }

  
 }