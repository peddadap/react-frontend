import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { FormGroup, FormControl, ControlLabel, Col, OverlayTrigger, ButtonToolbar, Tooltip, Checkbox} from "react-bootstrap";
import "../styles/Home.css";
import { Form } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import EditOICore from "../components/EditOICore";
import Attachments from "../components/Attachments";
import issuanceData1 from "../data/Issuance-1.json";
import issuanceData2 from "../data/Issuance-2.json";
import issuanceData3 from "../data/Issuance-3.json";
import LinkWithTooltip from "../components/tooltip";
import Config from "../configurations/ux.json";
import configStatusOptions from "../configurations/ticketStatusConfig";

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
      Submitbutton: false,
      editdata: {},
      statusOptions: '',
      selectedStatus: '',
      newattachments: '',
    }
    this.state.ticketDataArr.push({name: "Data-09-25-2017.xls", value: "Excel1",});
    this.state.ticketDataArr.push({name: "Data-09-22-2017.xls", value: "Excel2",});
    this.state.ticketDataArr.push({name: "Data-09-21-2017.xls", value: "Excel3",});
    this.state.ticketDataArrNew = this.state.ticketDataArr;
  }

  async componentWillReceiveProps () {
    if( this.props.requestStatus && this.props.requestStatus['cell'] !== '' ){
      this.setState({ selectedStatus: this.props.requestStatus['cell'] });
    }
    if(this.props.requestStatus && 
        ( this.props.requestStatus['cell'] == 'Open' || 
          this.props.requestStatus['cell'] == 'Error' )
    ) {
      this.setState({ editdata: {mode: 'click', blurToSave: true, afterSaveCell: this.onAfterSaveCell} });
    } else {
      this.setState({ editdata: {} });
    }
    if(this.props.requestStatus && 
        ( this.props.requestStatus['cell'] == 'New' || 
          this.props.requestStatus['cell'] == 'Pending' ||
          this.props.requestStatus['cell'] == 'Closed' ||
          this.props.requestStatus['cell'] == 'Recall' )
    ) {
      this.setState({ Submitbutton: false });
    } else {
      this.setState({ Submitbutton: true });
    }
    if( this.props.requestStatus ) {
      var status = this.props.requestStatus['cell'];
      if(status !== '' && status !== 'undefined' && status !== undefined ) {
        var statoption = [];
        Object.keys( configStatusOptions[status] ).map((k, index) => {
          if( configStatusOptions[status][k] == this.state.selectedStatus ) {
            statoption.push(<option value={ configStatusOptions[status][k] } selected>{ configStatusOptions[status][k] }</option>);
          } else {
            statoption.push(<option value={ configStatusOptions[status][k] }>{ configStatusOptions[status][k] }</option>);
          }
        });
        this.setState({ statusOptions: statoption, });  
      }
    }
    if(this.props.requestStatus && this.props.requestStatus['cell'] == 'Error') {
      this.setState({ newattachments: <Attachments/>, });
    } else {
      this.setState({ newattachments: '', });
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.props.handleToUpdate(1, this.props.requestId, this.state.selectedStatus);
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
    return this.state.Submitbutton;
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

  handleStatusChange = event => {
    this.setState({ selectedStatus: event.target.value }); 
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
      <div style={ { margin: '15px' } }>
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

    function trClassFormat(rowData, rIndex) {
      var myClassName='';
      if(rowData.Remark !== '') myClassName='myErrorRow'
      return myClassName;
    }

    Object.keys(this.state.ticketDataArr).map((k, index) => {
      attachementListShow.push(<option value={ this.state.ticketDataArr[k]['value'] }>{ this.state.ticketDataArr[k]['name'] }</option>);
    });
    if(this.props.requestStatus && ( this.props.requestStatus['cell'] == 'Open' || this.props.requestStatus['cell'] == 'Error' )) {
      Object.keys(this.state.ticketDataArrNew).map((k, index) => {
        attachmentListData.push(<Checkbox inline label={this.state.ticketDataArrNew[k]['value']} onChange={() => this.handleFileChange(this.state.ticketDataArrNew[k]['value'])}> { this.state.ticketDataArrNew[k]['name'] } </Checkbox>);
      });
      attachmentList.push(
        <FormGroup controlId = {"ticketTypeedit"} style={{ 'margin-bottom': '10px' }}>
          <Col componentClass={ControlLabel} sm={3}>{ "Select Existing Attachments you wish to remove" }</Col>
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
      <EditOICore requestId={ this.props.requestId } requestStatus={ this.props.requestStatus } />
      <hr/>
      <FormGroup controlId="statusChange" style={{ 'margin-bottom': '10px' }}>
        <Col componentClass={ControlLabel} sm={3}>Change Request Status</Col>
        <Col sm={6} smoffset={3}>
          <FormControl componentClass="select" placeholder="select" onChange={this.handleStatusChange}>
            { this.state.statusOptions }
          </FormControl>
        </Col>
      </FormGroup>
      <hr/>
      { this.state.newattachments }
      { attachmentList } 
      <FormGroup controlId="attachment" style={{ 'margin-bottom': '10px' }}>
        <Col componentClass={ControlLabel} sm={3}>Existing Attachments</Col>
        <Col sm={6}>
          <FormControl bsSize ="small" componentClass="select" placeholder="select" onChange={this.handleChange}>
            { attachementListShow }
          </FormControl>
        </Col>
        <Col smoffset={3}></Col>
      </FormGroup>
      <hr/>
      <BootstrapTable data={ this.state.ticketData } trClassName={ trClassFormat } cellEdit={ this.state.editdata } striped={true} pagination options={ options } selectRow={ selectRowProp }  multiColumnSearch={ true } exportCSV search>{rows}</BootstrapTable>
      <hr/>
      <FormGroup controlId="ticketTypeButtons">
        <Col sm={5}></Col>
        <Col sm={1}>
          <Button
            bsStyle="primary"
            bsSize="large"
            onClick={ () => this.props.handleToUpdate('1') } 
          >
            Cancel
          </Button>
        </Col>
        <Col sm={1}>
          <LoaderButton
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text={this.state.text}
            loadingText={this.state.loadingText}
          />
          <Col sm={5}></Col>
        </Col>
      </FormGroup>
      </Form>
    );
  }
}
