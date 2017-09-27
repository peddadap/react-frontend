import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { FormGroup, FormControl, ControlLabel, Col} from "react-bootstrap";
import "./Home.css";
import { Form } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import EditOICore from "../components/EditOICore";
import attachmentData from "../attachmentData.json";
import issuanceData1 from "../Issuance-1.json";
import issuanceData2 from "../Issuance-2.json";
import Config from "./ux.json";

export default class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      ticketData: issuanceData1,
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

  validateForm() {  
  }

  handleChange = event => {
    if(event.target.value === 'Excel2') {
      this.setState({
        ticketData: issuanceData2
      });
    } else {
      this.setState({
        ticketData: issuanceData1
      });
    }
  }

  render(tickets) {
    var rows = [];
    let uxConfig = Config.oi;
    let options = {
      insertModalHeader: this.createCustomModalHeader,
    };
    const selectRowProp = {
      mode: 'checkbox',
      showOnlySelected: true,
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
      <EditOICore></EditOICore>
      <hr/>
      <FormGroup controlId="ticketType">
        <Col componentClass={ControlLabel} sm={3}>Ticket Type</Col>
        <Col sm={6}>
          <FormControl bsSize ="small" componentClass="select" placeholder="select" onChange={this.handleChange}>
            <option value="Excel1">Data-08-25-2017.xls</option>
            <option value="Excel2">Data-09-25-2017.xls</option>
          </FormControl>
        </Col>
        <Col smoffset={3}></Col>
      </FormGroup>
      <hr/>
      <BootstrapTable data={ this.state.ticketData } cellEdit={ cellEditProp } insertRow={ true } pagination  options={ options } selectRow={ selectRowProp }  deleteRow={ true }  multiColumnSearch={ true } >{rows}</BootstrapTable>
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
