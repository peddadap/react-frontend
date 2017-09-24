import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import "./Home.css";
import { Form } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import OICore from "../components/OICore";
//import jsonData from "../data.json";
import Config from "./ux.json";

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

  onAfterSaveCell(row, cellName, cellValue) {
    alert(`Save cell ${cellName} with value ${cellValue}`);
  
    let rowStr = '';
    for (const prop in row) {
      rowStr += prop + ': ' + row[prop] + '\n';
    }
  
    alert('The whole row :\n' + rowStr);
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

  validateForm(){
    
  }

  render(tickets) {
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
    const  cellEditProp = {
      mode: 'click',
      blurToSave: true,
      afterSaveCell: this.onAfterSaveCell
    }; 
    Object.keys(uxConfig).map((k, index) => { 
      if(uxConfig[k]['isKey']){
        rows.push(<TableHeaderColumn width = {"120"} dataField={k}  isKey >{k}</TableHeaderColumn>);
       }
       else{
        rows.push(<TableHeaderColumn width = {"120"} dataField={k}>{k}</TableHeaderColumn>);
       }
    });
    return(
      <Form horizontal onSubmit={this.handleSubmit}>
      <br/>
      <OICore></OICore>
      <br/>
      <h1> Attachments </h1>
      <BootstrapTable data={this.state.ticketData} cellEdit={ cellEditProp } insertRow={ true } options={ options } selectRow={ selectRowProp }  deleteRow={ true }  multiColumnSearch={ true } >
      <TableHeaderColumn dataField='ID' isKey headerAlign='left' dataAlign='left' dataFormat={ this.colFormatter } dataSort>AttachmentID</TableHeaderColumn>
      <TableHeaderColumn dataField='FileName' headerAlign='left' dataAlign='left' dataSort>FileName </TableHeaderColumn>
      <TableHeaderColumn dataField='Type' headerAlign='left' dataAlign='left' dataSort>FileType</TableHeaderColumn>
      <TableHeaderColumn dataField='UploadedDate' headerAlign='left' dataAlign='left' dataSort>UploadDate</TableHeaderColumn>
      <TableHeaderColumn dataField='Comments' headerAlign='left' dataAlign='left' dataFormat={this.dateFormatter} dataSort>Comments</TableHeaderColumn>
      </BootstrapTable>
      <BootstrapTable data={this.state.ticketData} cellEdit={ cellEditProp } insertRow={ true } pagination  options={ options } selectRow={ selectRowProp }  deleteRow={ true }  multiColumnSearch={ true } >{rows}</BootstrapTable>
      <LoaderButton
        block
        bsStyle="primary"
        bsSize="large"
        disabled={!this.validateForm()}
        type="submit"
        isLoading={this.state.isLoading}
        text="Create"
        loadingText="Creating…"
      />
    </Form>
    );
  }
}
