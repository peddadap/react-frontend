import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { PageHeader, ListGroup,ListGroupItem,Button,Nav,NavItem,Navbar,Tabs,Tab} from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import "./Home.css";
import jsonData from "../data.json";

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
  render(tickets) {
    return (
		  <BootstrapTable data={jsonData} cellEdit={ cellEditProp } pagination>
			  <TableHeaderColumn isKey dataField='id'>Product ID</TableHeaderColumn>
			  <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
			  <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
		  </BootstrapTable>
    );
  }
}
