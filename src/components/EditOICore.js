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
        showfields: 'Original',
        companyno: jsonEditOICoreData[0].companyno,
        totalshares: jsonEditOICoreData[0].totalshares,
        legend: jsonEditOICoreData[0].legend,
        parentCo: jsonEditOICoreData[0].parentCo,
        childCo: jsonEditOICoreData[0].childCo,
        controlNo: jsonEditOICoreData[0].controlNo,
        controlAcct: jsonEditOICoreData[0].controlAcct,
        surrender: jsonEditOICoreData[0].surrender,
        requestId: 1,
    }
  }

  async componentWillReceiveProps () {
    if(this.props.requestId) {
        this.setState({requestId: this.props.requestId + 1,});
    }else{
        this.setState({requestId: 1,});
    }
  }

  handleChangeDate(value, formattedValue) {
    this.setState({
      value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z" 
      formattedValue: formattedValue, // Formatted String, ex: "11/19/2016" 
    });
  }

    componentDidMount () {
        if (this.didSwitchParentObject) {
            this.didSwitchParentObject= false;
            this.refs.myTextInputtotalshares.value = this.state.totalshares;
            this.refs.myTextInputcompanyno.value = this.state.companyno;
            this.refs.myTextInputlegend.value = this.state.legend;
            // this.refs.myTextInputparentCo.value = this.state.parentCo;
            // this.refs.myTextInputchildCo.value = this.state.childCo;
            // this.refs.myTextInputcontrolNo.value = this.state.controlNo;
            // this.refs.myTextInputcontrolAcct.value = this.state.controlAcct;
            // this.refs.myTextInputsurrender.value = this.state.surrender;
        }
    }

    handleChange = event => {
        if(event.target.id == 'ticketType') {
            if(event.target.value == 'Vestings')
                this.setState({
                    showfields: 'Vestings',
                })
            else
                if(event.target.value === 'Terminations')
                    this.setState({
                        showfields: 'Terminations',
                    })
                else
                    if(event.target.value === 'Grants')
                        this.setState({
                            showfields: 'Grants',
                        })
                    else
                        if(event.target.value === 'Surrender')
                            this.setState({
                                showfields: 'Surrender',
                            })
                        else 
                            this.setState({
                                showfields: 'Original',
                            })
        }

        this.setState({
            [event.target.id]: event.target.value
        });
    }
  
    render(){
        let Fields;
        if(this.state.showfields == 'Original') {
            Fields = (
                <div>
                <FormGroup controlId="companyno" style={{ 'margin-bottom': '10px' }}>
                   <Col componentClass={ControlLabel} sm={3}>Company #</Col>
                    <Col sm={6} smoffset={3}>
                        <FormControl onChange={this.handleChange} type="text"  ref="myTextInputcompanyno" defaultValue={ this.state.companyno } onBlur = {this.handleChange}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="totalshares" style={{ 'margin-bottom': '10px' }}>
                    <Col componentClass={ControlLabel} sm={3}>Total Shares #</Col>
                    <Col sm={6} smoffset={3}>
                        <FormControl onChange={this.handleChange} type="text"  ref="myTextInputtotalshares" defaultValue={ this.state.totalshares } onBlur = {this.handleChange}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="legend" style={{ 'margin-bottom': '10px' }}>
                    <Col componentClass={ControlLabel} sm={3}>Legend</Col>
                    <Col sm={6} smoffset={3}>
                        <FormControl onChange={this.handleChange} type="text" maxLength="1"  ref="myTextInputlegend" defaultValue={ this.state.legend } onBlur = {this.handleChange}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="issuancedate" style={{ 'margin-bottom': '10px' }}>
                    <Col componentClass={ControlLabel} sm={3}>Issuance Date</Col>
                    <Col sm={6} smoffset={3}>
                        <DatePicker id="example-datepicker" value={this.state.value} onChange={this.handleChangeDate.bind(this)} />
                    </Col>
                </FormGroup>
                <FormGroup controlId="bookentry" style={{ 'margin-bottom': '10px' }}>
                    <Col componentClass={ControlLabel} sm={3}>Book Entry</Col>
                    <Col sm={6} smoffset={3}>
                        <FormControl bsSize ="small" componentClass="select" placeholder="select" onChange={this.handleChange}>
                            <option value="book">B</option>
                            <option value="physical"> </option>
                        </FormControl>
                    </Col>
                </FormGroup>
                </div>
            )
        } else {
            if(this.state.showfields == 'Grants') {
                Fields = (<div>
                    <FormGroup controlId="parentCo" style={{ 'margin-bottom': '10px' }}> 
                        <Col componentClass={ControlLabel} sm={3}>Parent Company No #</Col>
                        <Col sm={6} smoffset={3}>
                            <FormControl onChange={this.handleChange} type="text"  ref="myTextInputparentCo" defaultValue={ this.state.parentCo } onBlur = {this.handleChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="childCo" style={{ 'margin-bottom': '10px' }}>
                        <Col componentClass={ControlLabel} sm={3}>Child Company No #</Col>
                        <Col sm={6} smoffset={3}>
                            <FormControl onChange={this.handleChange} type="text"  ref="myTextInputchildCo" defaultValue={ this.state.childCo } onBlur = {this.handleChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="controlNo" style={{ 'margin-bottom': '10px' }}>
                        <Col componentClass={ControlLabel} sm={3}>Control No #</Col>
                        <Col sm={6} smoffset={3}>
                            <FormControl onChange={this.handleChange} type="text"  ref="myTextInputcontrolNo" defaultValue={ this.state.controlNo } onBlur = {this.handleChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="totalshares" style={{ 'margin-bottom': '10px' }}>
                        <Col componentClass={ControlLabel} sm={3}>Total Shares #</Col>
                        <Col sm={6} smoffset={3}>
                            <FormControl onChange={this.handleChange} type="text"  ref="myTextInputtotalshares" defaultValue={ this.state.totalshares } onBlur = {this.handleChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="controlAcct" style={{ 'margin-bottom': '10px' }}>
                        <Col componentClass={ControlLabel} sm={3}>Control Account No #</Col>
                        <Col sm={6} smoffset={3}>
                            <FormControl onChange={this.handleChange} type="text"  ref="myTextInputcontrolAcct" defaultValue={ this.state.controlAcct } onBlur = {this.handleChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="issuancedate" style={{ 'margin-bottom': '10px' }}>
                        <Col componentClass={ControlLabel} sm={3}>Issuance Date</Col>
                        <Col sm={6} smoffset={3}>
                            <DatePicker id="example-datepicker" value={this.state.value} onChange={this.handleChangeDate.bind(this)} />
                        </Col>
                    </FormGroup>
                </div>)
            } else {
                if(this.state.showfields == 'Vestings') {
                    Fields = (<div>
                    <FormGroup controlId="parentCo" style={{ 'margin-bottom': '10px' }}> 
                        <Col componentClass={ControlLabel} sm={3}>Parent Company No #</Col>
                        <Col sm={6} smoffset={3}>
                            <FormControl onChange={this.handleChange} type="text"  ref="myTextInputparentCo" defaultValue={ this.state.parentCo } onBlur = {this.handleChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="childCo" style={{ 'margin-bottom': '10px' }}>
                        <Col componentClass={ControlLabel} sm={3}>Child Company No #</Col>
                        <Col sm={6} smoffset={3}>
                            <FormControl onChange={this.handleChange} type="text"  ref="myTextInputchildCo" defaultValue={ this.state.childCo } onBlur = {this.handleChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="controlAcct" style={{ 'margin-bottom': '10px' }}>
                        <Col componentClass={ControlLabel} sm={3}>Control Account No #</Col>
                        <Col sm={6} smoffset={3}>
                            <FormControl onChange={this.handleChange} type="text"  ref="myTextInputcontrolAcct" defaultValue={ this.state.controlAcct } onBlur = {this.handleChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="totalshares" style={{ 'margin-bottom': '10px' }}>
                        <Col componentClass={ControlLabel} sm={3}>Total Shares #</Col>
                        <Col sm={6} smoffset={3}>
                            <FormControl onChange={this.handleChange} type="text"  ref="myTextInputtotalshares" defaultValue={ this.state.totalshares } onBlur = {this.handleChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="vestingdate" style={{ 'margin-bottom': '10px' }}>
                        <Col componentClass={ControlLabel} sm={3}>Vesting Date</Col>
                        <Col sm={6} smoffset={3}>
                            <DatePicker id="example-datepicker" value={this.state.value} onChange={this.handleChangeDate.bind(this)} />
                        </Col>
                    </FormGroup>                    
                    </div>)
                } else {
                    if(this.state.showfields == 'Terminations') {
                        Fields = (<div>
                            <FormGroup controlId="parentCo" style={{ 'margin-bottom': '10px' }}> 
                                <Col componentClass={ControlLabel} sm={3}>Parent Company No #</Col>
                                <Col sm={6} smoffset={3}>
                                    <FormControl onChange={this.handleChange} type="text"  ref="myTextInputparentCo" defaultValue={ this.state.parentCo } onBlur = {this.handleChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="childCo" style={{ 'margin-bottom': '10px' }}>
                                <Col componentClass={ControlLabel} sm={3}>Child Company No #</Col>
                                <Col sm={6} smoffset={3}>
                                    <FormControl onChange={this.handleChange} type="text"  ref="myTextInputchildCo" defaultValue={ this.state.childCo } onBlur = {this.handleChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="controlNo" style={{ 'margin-bottom': '10px' }}>
                                <Col componentClass={ControlLabel} sm={3}>Control No #</Col>
                                <Col sm={6} smoffset={3}>
                                    <FormControl onChange={this.handleChange} type="text"  ref="myTextInputcontrolNo" defaultValue={ this.state.controlNo } onBlur = {this.handleChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="totalshares" style={{ 'margin-bottom': '10px' }}>
                                <Col componentClass={ControlLabel} sm={3}>Total Shares #</Col>
                                <Col sm={6} smoffset={3}>
                                    <FormControl onChange={this.handleChange} type="text"  ref="myTextInputtotalshares" defaultValue={ this.state.totalshares } onBlur = {this.handleChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="issuancedate" style={{ 'margin-bottom': '10px' }}>
                                <Col componentClass={ControlLabel} sm={3}>Date</Col>
                                <Col sm={6} smoffset={3}>
                                    <DatePicker id="example-datepicker" value={this.state.value} onChange={this.handleChangeDate.bind(this)} />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="disposition" style={{ 'margin-bottom': '10px' }}>
                                <Col componentClass={ControlLabel} sm={3}>Disposition</Col>
                                <Col sm={6} smoffset={3}>
                                <FormControl bsSize ="small" componentClass="select" placeholder="select" onChange={this.handleChange}>
                                    <option value="retire">Retire</option>
                                    <option value="return">Return to Company Treasury</option>
                                </FormControl>
                                </Col>
                            </FormGroup>
                        </div>)
                    } else {
                        if(this.state.showfields == 'Surrender') {
                            Fields = (<div>
                                <FormGroup controlId="companyno" style={{ 'margin-bottom': '10px' }}>
                                    <Col componentClass={ControlLabel} sm={3}>Company No #</Col>
                                    <Col sm={6} smoffset={3}>
                                        <FormControl onChange={this.handleChange} type="text"  ref="myTextInputcompanyno" defaultValue={ this.state.companyno } onBlur = {this.handleChange}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="totalshares" style={{ 'margin-bottom': '10px' }}>
                                    <Col componentClass={ControlLabel} sm={3}>Total Shares #</Col>
                                    <Col sm={6} smoffset={3}>
                                        <FormControl onChange={this.handleChange} type="text"  ref="myTextInputtotalshares" defaultValue={ this.state.totalshares } onBlur = {this.handleChange}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="issuancedate" style={{ 'margin-bottom': '10px' }}>
                                    <Col componentClass={ControlLabel} sm={3}>Date</Col>
                                    <Col sm={6} smoffset={3}>
                                        <DatePicker id="example-datepicker" value={this.state.value} onChange={this.handleChangeDate.bind(this)} />
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="disposition" style={{ 'margin-bottom': '10px' }}>
                                    <Col componentClass={ControlLabel} sm={3}>Disposition</Col>
                                    <Col sm={6} smoffset={3}>
                                        <FormControl bsSize ="small" componentClass="select" placeholder="select" onChange={this.handleChange}>
                                            <option value="retire">Retire</option>
                                            <option value="return">Return to Company Treasury</option>
                                        </FormControl>
                                    </Col>
                                </FormGroup>                        
                        </div>)
                        }
                    }
                }
            }
        }
    
    return(
        <div>
            <FormGroup controlId="ticketType" style={{ 'margin-bottom': '10px' }}>
                <Col componentClass={ControlLabel} sm={3}>Request Number</Col>
                <Col sm={6} smoffset={3}>{ this.state.requestId }</Col>
            </FormGroup>
            <FormGroup controlId="ticketType" style={{ 'margin-bottom': '10px' }}>
                <Col componentClass={ControlLabel} sm={3}>Request Type</Col>
                <Col sm={6} smoffset={3}>
                    <FormControl bsSize ="small" componentClass="select" placeholder="select" disabled="true">
                        <option value="Original">Original Issuance</option>
                        <option value="Grants">Grants</option>
                        <option value="Vestings">Vestings</option>
                        <option value="Terminations">RSP Termination</option>
                        <option value="Surrender">Surrender</option>
                    </FormControl>
                </Col>
            </FormGroup>
            <FormGroup controlId="priority" style={{ 'margin-bottom': '10px' }}>
                <Col componentClass={ControlLabel} sm={3}>Priority</Col>
                <Col sm={6} smoffset={3}>
                    <FormControl componentClass="select" placeholder="select" onChange={this.handleChange}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </FormControl>
                </Col>
            </FormGroup>
            { Fields }
        </div>
     );
  }
}
