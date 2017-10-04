import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, Col} from "react-bootstrap";
import jsonEditOICoreData from "../EditOICore.json";
import DatePicker from "react-bootstrap-date-picker";


export default class EditOICore extends Component {

  constructor(props) {
    super(props);
    var value1 = new Date().toISOString();
    this.didSwitchParentObject = true;
    this.state = {
        value: value1,
        displayDate: 'Issue Date',
        shareno: 'Share #',
        showlegend: true,
        ParentCompany: jsonEditOICoreData[0].ParentCompany,
        ChildCompany: jsonEditOICoreData[0].ChildCompany,
        controlaccount: jsonEditOICoreData[0].controlaccount,
        treasureaccount: jsonEditOICoreData[0].treasureaccount,
        totalshares: jsonEditOICoreData[0].totalshares,
        Legend: jsonEditOICoreData[0].Legend,
    }
  }

  handleChangeDate(value, formattedValue) {
    this.setState({
      value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z" 
      formattedValue: formattedValue, // Formatted String, ex: "11/19/2016" 
    });
  }

    componentDidUpdate () {
        if (this.didSwitchParentObject) {
            this.didSwitchParentObject= false;
            this.refs.myTextInputParentCompany.value = this.state.ParentCompany;
            this.refs.myTextInputChildCompany.value = this.state.ChildCompany;
            this.refs.myTextInputcontrolaccount.value = this.state.controlaccount;
            this.refs.myTextInputtreasureaccount.value = this.state.treasureaccount;
            this.refs.myTextInputtotalshares.value = this.state.totalshares;
            this.refs.myTextInputLegend.value = this.state.Legend;
        }
    }

  async componentDidMount() {
   }

  handleChange = event => {
    if(event.target.id == 'ticketType') {
        if(event.target.value == 'Vestings')
            this.setState({
                displayDate: 'Vesting Date',
                shareno: 'Shares Vested',
                showlegend: false,
            })
        else
            if(event.target.value === 'Terminations')
                this.setState({
                    displayDate: 'Termination Date',
                    shareno: 'Shares Terminated',
                    showlegend: false,
                })
            else
                this.setState({
                    displayDate: 'Issue Date',
                    shareno: 'Share #',
                    showlegend: true,
                })
    }
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  
  render(){
    let legendTxt="";
    let bookTxt="";
    if(this.state.showlegend) {
        legendTxt = (
            <FormGroup controlId="Legend">
                <Col componentClass={ControlLabel} sm={3}>Legend</Col>
                <Col sm={6}>
                    <FormControl onChange={this.handleChange} type="text" maxLength="1"  ref="myTextInputLegend" defaultValue={ this.state.Legend } onBlur = {this.handleChange} />
                </Col>
                <Col smoffset={3}></Col>
            </FormGroup>
        )
        bookTxt = (
            <FormGroup controlId="BookEntry">
                <Col componentClass={ControlLabel} sm={3}>Book Entry</Col>
                <Col sm={6}>
                    <FormControl onChange={this.handleChange} type="text" value="B" maxLength="1"/>
                </Col>
                <Col smoffset={3}></Col>
            </FormGroup>    
        )
    } else {
        legendTxt = "";
        bookTxt="";
    }
    return(
        <div>
            <FormGroup controlId="ticketType">
                <Col componentClass={ControlLabel} sm={3}>Request Type</Col>
                <Col sm={6}>
                    <FormControl bsSize ="small" componentClass="select" placeholder="select" onChange={this.handleChange}>
                        <option value="Original">Original Issuance</option>
                        <option value="Grants">Grants</option>
                        <option value="Vestings">Vestings</option>
                        <option value="Terminations">Terminations</option>
                    </FormControl>
                </Col>
                <Col smoffset={3}></Col>
            </FormGroup>
            <FormGroup controlId="priority">
                <Col componentClass={ControlLabel} sm={3}>Priority</Col>
                <Col sm={6}>
                    <FormControl componentClass="select" placeholder="select" onChange={this.handleChange}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </FormControl>
                </Col>
                <Col smoffset={3}></Col>
            </FormGroup>
            <FormGroup controlId="parentCo">
                <Col componentClass={ControlLabel} sm={3}>Parent Company No #</Col>
                <Col sm={6}>
                    <FormControl onChange={this.handleChange} type="text" ref="myTextInputParentCompany" defaultValue={ this.state.ParentCompany } onBlur = {this.handleChange}/>
                </Col>
                <Col smoffset={3}></Col>
            </FormGroup>
            <FormGroup controlId="childCo">
                <Col componentClass={ControlLabel} sm={3}>Child Company No #</Col>
                <Col sm={6}>
                    <FormControl onChange={this.handleChange} type="text" ref="myTextInputChildCompany" defaultValue={ this.state.ChildCompany } onBlur = {this.handleChange}/>
                </Col>
                <Col smoffset={3}></Col>
            </FormGroup>
            <FormGroup controlId="controlAcct">
                <Col componentClass={ControlLabel} sm={3}>Control Account No #</Col>
                <Col sm={6}>
                    <FormControl onChange={this.handleChange} type="text" ref="myTextInputcontrolaccount" defaultValue={ this.state.controlaccount } onBlur = {this.handleChange}/>
                </Col>
                <Col smoffset={3}></Col>
            </FormGroup>
            <FormGroup controlId="TreasuryAcct">
                <Col componentClass={ControlLabel} sm={3}>Treasury Account No #</Col>
                <Col sm={6}>
                    <FormControl onChange={this.handleChange} type="text" ref="myTextInputtreasureaccount" defaultValue={ this.state.treasureaccount } onBlur = {this.handleChange}/>
                </Col>
                <Col smoffset={3}></Col>
            </FormGroup>
            <FormGroup controlId="TotalShares">
                <Col componentClass={ControlLabel} sm={3}>{ this.state.shareno }</Col>
                <Col sm={6}>
                    <FormControl onChange={this.handleChange} type="text" ref="myTextInputtotalshares" defaultValue={ this.state.totalshares } onBlur = {this.handleChange} />
                </Col>
                <Col smoffset={3}></Col>
            </FormGroup>
            { legendTxt }
            <FormGroup controlId="Date">
                <Col componentClass={ControlLabel} sm={3}>{ this.state.displayDate }</Col>
                <Col sm={6}>
                    <DatePicker id="example-datepicker" value={this.state.value} onChange={this.handleChangeDate.bind(this)} />
                </Col>
                <Col smoffset={3}></Col>
            </FormGroup>
            { bookTxt }
        </div>
     );
  }
}
