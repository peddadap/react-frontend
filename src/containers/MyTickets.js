import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Button, Modal, Radio, FormGroup} from 'react-bootstrap';
import "./Home.css";
import jsonMyTicketData from "../myTickets.json";
// import StatusChange from "../components/StatusChange";
import configStatus from "../components/StatusChangeConfig";

export default class MyTickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      tickets: [],
      showinprogress: false,
      showdone: false,
      cellvalue: '',
      cellvalueTo: [],
      cellvalueToSelected: '',
      rowid: 0,
    };

    this.options = {
      defaultSortName: 'ID',  // default sort column name
      defaultSortOrder: 'asc'  // default sort order
    };
  }

  async componentWillReceiveProps () {
    if(this.props.actTab && this.props.actTab == 1 && this.props.requestId && this.props.requestStatus && this.props.requestStatus == 'Open') {
      this.updateticketswithstate( this.props.requestId, 'Pending' );
    }
    if(this.props.actTab && this.props.actTab == 1 && this.props.requestId && this.props.requestStatus && this.props.requestStatus == 'Error') {
      this.updateticketswithstate( this.props.requestId, 'New' );
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
 
  colFormatter = (cell, row) => {
    return (
      <Link to={"/ticket/"+cell}>
        {cell}
      </Link>
    )
  }

  handleStateChange(newstate){
    this.setState({
      cellvalueToSelected: newstate
    });
  }

  dateFormatter(cell, row){
    var cdate = cell.split('T')[0];
    return cdate;
  }

  updatetickets(row, newstate){
    var cloneArrayone = JSON.parse(JSON.stringify(this.state.tickets));
    cloneArrayone[row].Status = newstate;
    return cloneArrayone;
  }

  updateticketswithstate(row, newstate){
    var cloneArrayone = JSON.parse(JSON.stringify(this.state.tickets));
    cloneArrayone[row].Status = newstate;
    this.setState({ tickets: cloneArrayone });
  }

  close() {
    this.setState({ showinprogress: false, showdone: false});
    return;
  }
  
  imageFormatter = (cell, row) => {
    switch(cell) {
      case 'Error':
          return (<Button bsStyle="danger" bsSize="small" className="myTicketsButton" onClick={ () => this.props.handleToUpdate('3', (row.ID - 1), { cell } ) } >{ cell }</Button>);
      case 'Recall':
          return (<Button bsStyle="danger" bsSize="small" className="myTicketsButton" onClick={ () => this.props.handleToUpdate('3', (row.ID - 1), { cell } ) }>{ cell }</Button>);
      case 'New':
          return (<Button bsStyle="success" bsSize="small" className="myTicketsButton" onClick={ () => this.props.handleToUpdate('3', (row.ID - 1), { cell } ) }>{ cell }</Button>);
      case 'Open':
          return ( <Button bsStyle="warning" bsSize="small" className="myTicketsButton" onClick={ () => this.props.handleToUpdate('3', (row.ID - 1), { cell } ) }>{ cell }</Button> );
      case 'Pending':
          return (<Button bsStyle="success" bsSize="small" className="myTicketsButton" onClick={ () => this.props.handleToUpdate('3', (row.ID - 1), { cell } ) }>{ cell }</Button>);
      case 'In-Progress':
          return (
              <div className="modal-container" id={row}>
                <Button
                  bsStyle="warning"
                  bsSize="small"
                  className="myTicketsButton"
                  onClick={() => this.setState({ showinprogress: true, cellvalue: cell, cellvalueTo: configStatus[cell], rowid: (row.ID - 1) })}
                >
                  { cell }
                </Button>
                <Modal
                  show={ this.state.showinprogress }
                  onHide={() => this.setState({ showinprogress: false})}
                  container={this}
                  aria-labelledby="contained-modal-title"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Change Status</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Change status form { this.state.cellvalue } to 
                    <FormGroup>
                      <Radio name="radioStateChange" onChange={ () => this.handleStateChange(this.state.cellvalueTo[0]) }>{ this.state.cellvalueTo[0] }</Radio>
                      <Radio name="radioStateChange" onChange={ () => this.handleStateChange(this.state.cellvalueTo[1]) }>{ this.state.cellvalueTo[1] }</Radio>
                    </FormGroup>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={() => { this.setState({ showinprogress: false,  }); this.props.handleToUpdate('3', (row.ID - 1), { cell } )}}>Cancel</Button>
                    <Button onClick={() => { this.setState({ showinprogress: false, tickets : this.updatetickets(this.state.rowid, this.state.cellvalueToSelected) }); }}>OK</Button>
                  </Modal.Footer>
                </Modal>
              </div>
          );
      case 'Hold':
          return (<Button bsStyle="danger" bsSize="small" className="myTicketsButton" onClick={ () => this.props.handleToUpdate('3', (row.ID - 1), { cell } ) }>{ cell }</Button>);
      case 'Done':
          return (
            <div className="modal-container" id={row}>
              <Button
                bsStyle="warning"
                bsSize="small"
                className="myTicketsButton"
                onClick={() => this.setState({ showdone: true, cellvalue: cell, cellvalueTo: configStatus[cell], rowid: (row.ID - 1) })}
              
              >
                { cell }
              </Button>
              <Modal
                show={ this.state.showdone }
                onHide={() => this.setState({ showdone: false})}
                container={this}
                aria-labelledby="contained-modal-title"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title">Change Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Change status form { this.state.cellvalue } to { this.state.cellvalueTo[0] }
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => { this.setState({ showdone: false, });this.props.handleToUpdate('3', (row.ID - 1), { cell } )}}>Cancel</Button>
                  <Button onClick={() => { this.setState({ showdone: false, tickets : this.updatetickets( this.state.rowid, this.state.cellvalueTo[0] ) }); }}>OK</Button>
                </Modal.Footer>
              </Modal>
            </div>
          );
      case 'Closed':
          return (<Button bsStyle="success" bsSize="small" className="myTicketsButton" onClick={ () => this.props.handleToUpdate('3', (row.ID - 1), { cell } ) }>{ cell }</Button>);
    }
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