import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { FormGroup, FormControl, ControlLabel, Col, OverlayTrigger, ButtonToolbar, Tooltip, Checkbox} from "react-bootstrap";
import "./Home.css";
import { Form } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import EditOICore from "../components/EditOICore";
import attachmentData from "../attachmentData.json";
import issuanceData1 from "../Issuance-1.json";
import issuanceData2 from "../Issuance-2.json";
import issuanceData3 from "../Issuance-3.json";
import LinkWithTooltip from "../components/tooltip";
import Config from "./ux.json";

export default class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      ticketData: issuanceData1,
      ticketDataArr: [],
      ticketDataArrNew: [],
      text: 'Submit',
      loadingText: 'Submitting.....',
    }
    this.state.ticketDataArr.push({name: "Data-09-25-2017.xls", value: "Excel1",});
    this.state.ticketDataArr.push({name: "Data-09-22-2017.xls", value: "Excel2",});
    this.state.ticketDataArr.push({name: "Data-09-21-2017.xls", value: "Excel3",});
    this.state.ticketDataArrNew.push({name: "Data-09-25-2017.xls", value: "Excel1",});
    this.state.ticketDataArrNew.push({name: "Data-09-22-2017.xls", value: "Excel2",});
    this.state.ticketDataArrNew.push({name: "Data-09-21-2017.xls", value: "Excel3",});
  }

  async componentWillReceiveProps () {
    if(this.props.requestStatus['cell'] == 'Error') {
      this.setState({ text: "Submit" });
      this.setState({ loadingText: "Submitting ....." });
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    if(this.props.requestStatus && this.props.requestStatus['cell'] == 'Open') {
      this.props.handleToUpdate(1, this.props.requestId, this.props.requestStatus['cell']);
    }
    if(this.props.requestStatus && this.props.requestStatus['cell'] == 'Error') {
      this.props.handleToUpdate(1, this.props.requestId, this.props.requestStatus['cell']);
    }
    return;
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
    return "false";
  }

  tooltip =(cell, row) => {
    return (<Tooltip id="tooltip"><strong>{ cell }</strong></Tooltip>);
  }

  ErrFormatter = (cell, row) => {
    if(cell !== '') {
      return (<LinkWithTooltip tooltip={cell} href="#" id="tooltip-1"><Button bsStyle="danger" bsSize="small">Error</Button></LinkWithTooltip>);
    } else {
      return ('');
    }
  }

  handleFileChange(idname) {
    var index = this.state.ticketDataArr.findIndex(x => x.value == idname);
    if(index == -1) {
      var indexnew = this.state.ticketDataArrNew.findIndex(x => x.value == idname);
      var datanew = this.state.ticketDataArrNew[indexnew];
      var tempArr = this.state.ticketDataArr;
      tempArr.push(datanew);
      this.setState({ticketDataArr: tempArr});
    } else {
      var newData = this.state.ticketDataArr.slice();
      newData.splice(index, 1);
      this.setState({ticketDataArr: newData});
    }
  }

  handleChange = event => {
    if(event.target.value === 'Excel2') {
      this.setState({
        ticketData: issuanceData2
      });
    } else {
      if(event.target.value === 'Excel3') {
        this.setState({
          ticketData: issuanceData3
        });
      } else {
        this.setState({
          ticketData: issuanceData1
        });
      }
    }
  }

  createCustomToolBar = props => {
    return (
      <div style={ { margin: '15px', 'padding-right': '2cm' } }>
        { props.components.btnGroup }
        <div className='col-xs-8 col-sm-4 col-md-4 col-lg-2'>
          { props.components.searchPanel }
        </div>
      </div>
    );
  }

  render(tickets) {
    var rows = [];
    var attachmentList = [];
    var attachmentListData = [];
    var attachementListShow = [];
    let uxConfig = Config.oi;
        
    let options = {
      insertModalHeader: this.createCustomModalHeader,
      toolBar: this.createCustomToolBar,
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

    function trClassFormat(rowData, rIndex) {
      var myClassName='';
      // console.log(JSON.stringify(rowData));
      // console.log(rIndex);
      if(rowData.Remark !== '') myClassName='myErrorRow'
      console.log('CLass: '+myClassName+'--'+rIndex);
      return myClassName;
    }

    Object.keys(this.state.ticketDataArr).map((k, index) => {
      attachementListShow.push(<option value={ this.state.ticketDataArr[k]['value'] }>{ this.state.ticketDataArr[k]['name'] }</option>);
    });
    if(this.props.requestStatus && this.props.requestStatus['cell'] == 'Open') {
      Object.keys(this.state.ticketDataArrNew).map((k, index) => {
        attachmentListData.push(<Checkbox inline label={this.state.ticketDataArrNew[k]['value']} onChange={() => this.handleFileChange(this.state.ticketDataArrNew[k]['value'])}> { this.state.ticketDataArrNew[k]['name'] } </Checkbox>);
      });
      attachmentList.push(
        <FormGroup controlId = {"ticketTypeedit"}>
          <Col componentClass={ControlLabel} sm={3}>{ "Select Attachments you wish to remove" }</Col>
          <Col sm={6}> { attachmentListData }</Col>
          <Col smoffset={3}></Col>
        </FormGroup>
      );
    }

    Object.keys(uxConfig).map((k, index) => { 
      if(uxConfig[k]['isKey']){
        rows.push(<TableHeaderColumn width = {"120"} dataField={k}  isKey >{k}</TableHeaderColumn>);
      }
      else{
        if(uxConfig[k]['noneditable']) {
          rows.push(<TableHeaderColumn width = {"120"} dataField={k} editable={false} dataFormat={this.ErrFormatter}  dataAlign='center'>{k}</TableHeaderColumn>);
        } else {
          rows.push(<TableHeaderColumn width = {"120"} dataField={k}>{k}</TableHeaderColumn>);
        }
      }
    });

    return(
      <Form horizontal onSubmit={this.handleSubmit}>
      <br/>
      <EditOICore></EditOICore>
      <hr/>
      { attachmentList } 
      <FormGroup controlId="ticketType">
        <Col componentClass={ControlLabel} sm={3}>Attachment</Col>
        <Col sm={6}>
          <FormControl bsSize ="small" componentClass="select" placeholder="select" onChange={this.handleChange}>
            { attachementListShow }
          </FormControl>
        </Col>
        <Col smoffset={3}></Col>
      </FormGroup>
      <hr/>
      <BootstrapTable data={ this.state.ticketData } trClassName={ trClassFormat } cellEdit={ cellEditProp } striped={true} pagination options={ options } selectRow={ selectRowProp }  multiColumnSearch={ true } search>{rows}</BootstrapTable>
      <LoaderButton
        bsStyle="primary"
        bsSize="large"
        className = "myclassforbutton"
        disabled={!this.validateForm()}
        type="submit"
        isLoading={this.state.isLoading}
        text={this.state.text}
        loadingText={this.state.loadingText}
      />
      </Form>
    );
  }
}
