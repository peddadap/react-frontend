import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import "./Home.css";

export default class MyTickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      tickets: []
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
    return  cdate;
  }
  
  render(tickets){

    return(
      <BootstrapTable data={this.state.tickets } striped={true} hover={true} pagination>
      <TableHeaderColumn dataField='id' isKey headerAlign='left' dataAlign='left' dataFormat={ this.colFormatter }>Ticket ID</TableHeaderColumn>
      <TableHeaderColumn dataField='company_no' headerAlign='left' dataAlign='left'>Company No</TableHeaderColumn>
      <TableHeaderColumn dataField='type' headerAlign='left' dataAlign='left'>Ticket Type</TableHeaderColumn>
      <TableHeaderColumn dataField='priority' headerAlign='left' dataAlign='left'>Priority</TableHeaderColumn>
      <TableHeaderColumn dataField='created_date' headerAlign='left' dataAlign='left' dataFormat={this.dateFormatter}>Created Date</TableHeaderColumn>
      <TableHeaderColumn dataField='submitted_date' headerAlign='left' dataAlign='left' dataFormat={this.dateFormatter}>Submitted Date</TableHeaderColumn>
      <TableHeaderColumn dataField='status' headerAlign='left' dataAlign='left'>Status</TableHeaderColumn>
      </BootstrapTable>
    )
  }

  
 }