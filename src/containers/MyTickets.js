import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Button, Modal} from 'react-bootstrap';
import "./Home.css";
import jsonMyTicketData from "../myTickets.json";
import StatusChange from "../components/StatusChange";
import configStatus from "../components/StatusChangeConfig";

export default class MyTickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      tickets: [],
      show: false,
      cellvalue: '',
      cellvalueTo: '',
      rowid: 0,
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

  updatetickets(row){
    var cloneArrayone = JSON.parse(JSON.stringify(this.state)).tickets;
    cloneArrayone[row].Status = this.state.cellvalueTo;
    return cloneArrayone;
  }

  close() {
    this.setState({ show: false});
    return;
  }
  
  imageFormatter = (cell, row) => {
    if(cell == 'Error' )
      return (<Button bsStyle="danger" bsSize="small" className="myTicketsButton" onClick={ () => this.props.handleToUpdate('3') } >{ cell }</Button>);
    else
      if(cell == 'Open' || cell == 'In-Progress')
        return (<Button bsStyle="info" bsSize="small" className="myTicketsButton">{ cell }</Button>);
      else
        if(cell == 'Pending' || cell == 'Review' || cell == 'Hold' || cell == 'Done') {
          return (
                  <div className="modal-container" id={row}>
                    <Button
                      bsStyle="warning"
                      bsSize="small"
                      className="myTicketsButton"
                      onClick={() => this.setState({ show: true, cellvalue: cell, cellvalueTo: configStatus[cell], rowid: (row.ID - 1) })}
                      
                    >
                      { cell }
                    </Button>
                    <Modal
                      show={ this.state.show }
                      onHide={() => this.setState({ show: false})}
                      container={this}
                      aria-labelledby="contained-modal-title"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Change Status</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Change status form { this.state.cellvalue } to { this.state.cellvalueTo }
                      </Modal.Body>
                      <Modal.Footer>
                        <Button onClick={() => { this.setState({ show: false }); if(this.state.cellvalue !== 'Pending') this.props.handleToUpdate('3') }}>Cancel</Button>
                        <Button onClick={() => { this.setState({ show: false, tickets : this.updatetickets(this.state.rowid) }); if(this.state.cellvalue !== 'Done') this.props.handleToUpdate('3') }}>OK</Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
          );
        }
        else 
          return (<Button bsStyle="success" bsSize="small" className="myTicketsButton">{ cell }</Button>);
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