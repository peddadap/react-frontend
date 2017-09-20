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
    console.log('New Ticket Has Access to Props');
    console.log(props);
    //this.file = null;

    this.state = {
      isLoading: true,
      ticketData: []
     }
  }

  async componentDidMount() {
    /* if (!this.props.isAuthenticated) {
       return;
     }*/
   
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

   createCustomModalHeader(onClose, onSave) {
    const headerStyle = {
      fontWeight: 'bold',
      fontSize: 'large',
      textAlign: 'center',
      backgroundColor: '#eeeeee'
    };
    return (
      <div className='modal-header' style={ headerStyle }>
        <h3>That is my custom header</h3>
        <button className='btn btn-info' onClick={ onClose }>Close it!</button>
      </div>
    );
  }

 /* customConfirm(next, dropRowKeys) {
    const dropRowKeysStr = dropRowKeys.join(',');
    if (confirm(`(It's a custom confirm)Are you sure you want to delete ${dropRowKeysStr}?`)) {
      // If the confirmation is true, call the function that
      // continues the deletion of the record.
      next();
    }
  }*/
  
  render(tickets) {
    console.log('>>>Here I am '+ this.props.tickets());
    var rows = [];
    let uxConfig = Config.oi;
    let options = {
      insertModalHeader: this.createCustomModalHeader,
      //handleConfirmDeleteRow: this.customConfirm
    };
    const selectRowProp = {
      mode: 'checkbox',
      showOnlySelected: true,
     // onSelectAll: this.onSelectAll
    };
    Object.keys(uxConfig).map((k, index) =>
    { 
      if(uxConfig[k]['isKey']){
        rows.push(<TableHeaderColumn width = {"120"} dataField={k}  isKey >{k}</TableHeaderColumn>);
       }
       else{
        rows.push(<TableHeaderColumn width = {"120"} dataField={k}>{k}</TableHeaderColumn>);
       }
    });
    return(<BootstrapTable data={this.state.ticketData} cellEdit={ cellEditProp } insertRow={ true } pagination  options={ options } selectRow={ selectRowProp }  deleteRow={ true }  multiColumnSearch={ true } >{rows}</BootstrapTable>);
  }

}
