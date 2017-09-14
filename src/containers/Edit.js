import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { PageHeader, ListGroup,ListGroupItem,Button,Nav,NavItem,Navbar,Tabs,Tab} from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import "./Home.css";
//import jsonData from "../data.json";
import Config from "./ux.json";

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
    this.state = {
      isLoading: true,
      jsonData: []
    };
  }
      
  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
      
    try {
      fetch('/jsonData')
        .then(res => res.json())
        .then(jsonData => { console.log('This is my front end log of Termination Object:'); console.log(jsonData);this.setState({ jsonData })} );
    } catch (e) {
      alert(e);
    }
    this.setState({ isLoading: false });
  }
     
  render(jsonData) {
    return (
		  <BootstrapTable data={jsonData} cellEdit={ cellEditProp } pagination >
        <TableHeaderColumn isKey dataField='id'>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='AccountNumber'>AccountNumber</TableHeaderColumn>
        <TableHeaderColumn dataField='Name1'>Name1</TableHeaderColumn>
        <TableHeaderColumn dataField='Name2'>Name2</TableHeaderColumn>
        <TableHeaderColumn dataField='TaxID'>TaxID</TableHeaderColumn>
        <TableHeaderColumn dataField='TerminationDate'>TerminationDate</TableHeaderColumn>
        <TableHeaderColumn dataField='SharesTerminated'>SharesTerminated</TableHeaderColumn>
        <TableHeaderColumn dataField='Disposition'>Disposition</TableHeaderColumn>
        <TableHeaderColumn dataField='GlobalID'>GlobalID</TableHeaderColumn>
        <TableHeaderColumn dataField='createdAt'>createdAt</TableHeaderColumn>
        <TableHeaderColumn dataField='updatedAt'>updatedAt</TableHeaderColumn>
{/*         {
          Object.keys(Config.terminations).map((k, index) => <TableHeaderColumn width = {"150"} dataField="AccountNumber">{k}</TableHeaderColumn>)
        } */}
  	  </BootstrapTable>
    );
  }
}
