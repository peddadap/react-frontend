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
    if (!this.props.isAuthenticated) {
      return;
    }
  
    try {
      fetch('/tickets')
      .then(res => res.json())
      .then(tickets => this.setState({ tickets }));
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

  handleSelect()
  {
    return true;
  }

  dateFormatter(cell, row){
   
   var cdate = (new Date(cell)).toISOString().split('T')[0]
    return  cdate;
  }
  
  render(tickets){

    console.log(">>>>>My tickes rendered");

    return(
      <BootstrapTable data={ tickets } striped={true} hover={true} >
      <TableHeaderColumn dataField='id' isKey={true} headerAlign='left' dataAlign='left' dataFormat={ this.colFormatter }>Ticket ID</TableHeaderColumn>
      <TableHeaderColumn dataField='type' headerAlign='left' dataAlign='left'>Ticket Type</TableHeaderColumn>
      <TableHeaderColumn dataField='status' headerAlign='left' dataAlign='left'>Status</TableHeaderColumn>
      <TableHeaderColumn dataField='created_date' headerAlign='left' dataAlign='left' dataFormat={this.dateFormatter}>Created Date</TableHeaderColumn>
      <TableHeaderColumn dataField='submitted_date' headerAlign='left' dataAlign='left' dataFormat={this.dateFormatter}>Submitted Date</TableHeaderColumn>
      </BootstrapTable>
    )
  }

  handleNoteClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute("href"));
  }

 }