import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { PageHeader, ListGroup,ListGroupItem,Button,Nav,NavItem,Navbar,Tabs,Tab} from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import "./Home.css";
import Config from "./ux.json";
import config_parent from "../config";

function onAfterSaveCell(row, cellName, cellValue) {
  alert(`Save cell ${cellName} with value ${cellValue}`);

  let rowStr = '';
  for (const prop in row) {
    rowStr += prop + ': ' + row[prop] + '\n';
  }

  alert('The whole row :\n' + rowStr);
}

const cellEditProp = {
  mode: 'click',
  blurToSave: true,
  afterSaveCell: onAfterSaveCell
};

export default class Edit extends Component {
  constructor(props) {
    super(props);
    console.log('New Ticket Has Access to Props');
    console.log(props);
    //this.file = null;

    this.state = {
      isLoading: true,
      ticketData: [],
      ticketMetaData: []
     }
  }

  async componentWillReceiveProps() {
    console.log('>>>>IN function componentWillReceiveProps');
    if( this.props.tickets() ) {
      try {
        fetch('/ticket_meta?id='+ this.props.tickets())
        .then(res => res.json())
        .then(ticketMetaData => {
          this.setState({ ticketMetaData });
          console.log('>>>>>>>>>>>>>>>>>>>.'+this.state.ticketMetaData);
        })
      } catch (e) {
        alert(e);
      }
      try {
        fetch('/issuances')
        .then(res => res.json())
        .then(ticketData => {
          this.setState({ ticketData });
       })
      } catch (e) {
        alert(e);
      }
      this.setState({ isLoading: false });
    }
  }

  async componentDidMount() {
    /* if (!this.props.isAuthenticated) {
       return;
     }*/
/*      try {
      fetch('/ticket_meta?id='+config_parent.TICKET_NO)
      .then(res => res.json())
      .then(ticketMetaData => {
        this.setState({ ticketMetaData });
        console.log('>>>>>>>>>>>>>>>>>>>.'+this.state.ticketMetaData);
      })
    } catch (e) {
      alert(e);
    }
     try {
       fetch('/issuances')
       .then(res => res.json())
       .then(ticketData => {
         this.setState({ ticketData });
       })
     } catch (e) {
       alert(e);
     }
    */
     this.setState({ isLoading: false });
  }
   
  render(tickets) {
    console.log('>>>Getting ticket Id: '+ this.props.tickets());
    var rows = [];
    let uxConfig = Config.oi;
    Object.keys(uxConfig).map((k, index) =>
    { 
      if(uxConfig[k]['isKey']){
        rows.push(<TableHeaderColumn width ="150px" dataField={k}  isKey >{k}</TableHeaderColumn>);
       }
       else{
        rows.push(<TableHeaderColumn width ="150px" dataField={k}>{k}</TableHeaderColumn>);
       }
    });
    return(
      <div id="edit_data">
        <BootstrapTable data={this.state.ticketMetaData}>
          <TableHeaderColumn isKey width ="150px" dataField='company_number'> Company number </TableHeaderColumn>
          <TableHeaderColumn width ="150px" dataField='child_company_number'> Child Company Number </TableHeaderColumn>
          <TableHeaderColumn width ="150px" dataField='control_account_number'> Control Account Number </TableHeaderColumn>
        </BootstrapTable>
        <BootstrapTable data={this.state.ticketMetaData}>
          <TableHeaderColumn isKey width ="150px" dataField='treasure_account_number'> Treasure Account Number </TableHeaderColumn>
          <TableHeaderColumn width ="150px" dataField='type'> Type </TableHeaderColumn>
          <TableHeaderColumn width ="150px" dataField='status'> Status </TableHeaderColumn>
        </BootstrapTable>
        <br/><br/>
        <BootstrapTable data={this.state.ticketData} cellEdit={ cellEditProp } pagination >{rows}</BootstrapTable>
      </div>
    );
  }
}
