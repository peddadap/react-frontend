import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, Col} from "react-bootstrap";
import DatePicker from "react-bootstrap-date-picker";

export default class OICore extends Component {

  constructor(props) {
    super(props);
    var value1 = new Date().toISOString();
    this.state = {
        value: value1,
        displayDate: 'Issue Date',
        shareno: 'Share #',
        showfields: 'Original',
     }
  }

  handleChangeDate(value, formattedValue) {
    this.setState({
      value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z" 
      formattedValue: formattedValue, // Formatted String, ex: "11/19/2016" 
    });
  }

  async componentDidMount() {
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
    let Fields=(
        <div>
        <FormGroup controlId="companyno" style={{ 'margin-bottom': '10px' }}>
            <Col componentClass={ControlLabel} sm={3}>Company #</Col>
            <Col sm={6}>
                <FormControl onChange={this.handleChange} type="text" />
            </Col>
            <Col smoffset={3}></Col>
        </FormGroup>
        <FormGroup controlId="totalshares" style={{ 'margin-bottom': '10px' }}>
            <Col componentClass={ControlLabel} sm={3}>Total Shares #</Col>
            <Col sm={6}>
                <FormControl onChange={this.handleChange} type="text" />
            </Col>
            <Col smoffset={3}></Col>
        </FormGroup>
        <FormGroup controlId="legend" style={{ 'margin-bottom': '10px' }}>
            <Col componentClass={ControlLabel} sm={3}>Legend</Col>
            <Col sm={6}>
                <FormControl onChange={this.handleChange} type="text" maxLength="1" />
            </Col>
            <Col smoffset={3}></Col>
        </FormGroup>
        <FormGroup controlId="issuancedate" style={{ 'margin-bottom': '10px' }}>
            <Col componentClass={ControlLabel} sm={3}>Issuance Date</Col>
            <Col sm={6}>
                <DatePicker id="example-datepicker" value={this.state.value} onChange={this.handleChangeDate.bind(this)} />
            </Col>
            <Col smoffset={3}></Col>
        </FormGroup>
        <FormGroup controlId="bookentry" style={{ 'margin-bottom': '10px' }}>
            <Col componentClass={ControlLabel} sm={3}>Book Entry</Col>
            <Col sm={6}>
                <FormControl bsSize ="small" componentClass="select" placeholder="select" onChange={this.handleChange}>
                    <option value="book">B</option>
                    <option value="physical"> </option>
                </FormControl>
            </Col>
            <Col smoffset={3}></Col>
        </FormGroup>
        </div>
    )
    if(this.state.showfields == 'Original') {
        Fields = (
            <div>
            <FormGroup controlId="companyno" style={{ 'margin-bottom': '10px' }}>
               <Col componentClass={ControlLabel} sm={3}>Company #</Col>
                <Col sm={6}>
                    <FormControl onChange={this.handleChange} type="text" />
                </Col>
                <Col smoffset={3}></Col>
            </FormGroup>
            <FormGroup controlId="totalshares" style={{ 'margin-bottom': '10px' }}>
                <Col componentClass={ControlLabel} sm={3}>Total Shares #</Col>
                <Col sm={6}>
                    <FormControl onChange={this.handleChange} type="text" />
                </Col>
                <Col smoffset={3}></Col>
            </FormGroup>
            <FormGroup controlId="legend" style={{ 'margin-bottom': '10px' }}>
                <Col componentClass={ControlLabel} sm={3}>Legend</Col>
                <Col sm={6}>
                    <FormControl onChange={this.handleChange} type="text" maxLength="1" />
                </Col>
                <Col smoffset={3}></Col>
            </FormGroup>
            <FormGroup controlId="issuancedate" style={{ 'margin-bottom': '10px' }}>
                <Col componentClass={ControlLabel} sm={3}>Issuance Date</Col>
                <Col sm={6}>
                    <DatePicker id="example-datepicker" value={this.state.value} onChange={this.handleChangeDate.bind(this)} />
                </Col>
                <Col smoffset={3}></Col>
            </FormGroup>
            <FormGroup controlId="bookentry" style={{ 'margin-bottom': '10px' }}>
                <Col componentClass={ControlLabel} sm={3}>Book Entry</Col>
                <Col sm={6}>
                    <FormControl bsSize ="small" componentClass="select" placeholder="select" onChange={this.handleChange}>
                        <option value="book">B</option>
                        <option value="physical"> </option>
                    </FormControl>
                </Col>
                <Col smoffset={3}></Col>
            </FormGroup>
            </div>
        )
    } else {
        if(this.state.showfields == 'Grants') {
            Fields = (<div>
                <FormGroup controlId="parentCo" style={{ 'margin-bottom': '10px' }}> 
                    <Col componentClass={ControlLabel} sm={3}>Parent Company No #</Col>
                    <Col sm={6}>
                        <FormControl onChange={this.handleChange} type="text" />
                    </Col>
                    <Col smoffset={3}></Col>
                </FormGroup>
                <FormGroup controlId="childCo" style={{ 'margin-bottom': '10px' }}>
                    <Col componentClass={ControlLabel} sm={3}>Child Company No #</Col>
                    <Col sm={6}>
                        <FormControl onChange={this.handleChange} type="text" />
                    </Col>
                    <Col smoffset={3}></Col>
                </FormGroup>
                <FormGroup controlId="controlNo" style={{ 'margin-bottom': '10px' }}>
                    <Col componentClass={ControlLabel} sm={3}>Control No #</Col>
                    <Col sm={6}>
                        <FormControl onChange={this.handleChange} type="text" />
                    </Col>
                    <Col smoffset={3}></Col>
                </FormGroup>
                <FormGroup controlId="totalshares" style={{ 'margin-bottom': '10px' }}>
                    <Col componentClass={ControlLabel} sm={3}>Total Shares #</Col>
                    <Col sm={6}>
                        <FormControl onChange={this.handleChange} type="text" />
                    </Col>
                    <Col smoffset={3}></Col>
                </FormGroup>
                <FormGroup controlId="controlAcct" style={{ 'margin-bottom': '10px' }}>
                    <Col componentClass={ControlLabel} sm={3}>Control Account No #</Col>
                    <Col sm={6}>
                        <FormControl onChange={this.handleChange} type="text" />
                    </Col>
                    <Col smoffset={3}></Col>
                </FormGroup>
                <FormGroup controlId="issuancedate" style={{ 'margin-bottom': '10px' }}>
                    <Col componentClass={ControlLabel} sm={3}>Issuance Date</Col>
                    <Col sm={6}>
                        <DatePicker id="example-datepicker" value={this.state.value} onChange={this.handleChangeDate.bind(this)} />
                    </Col>
                    <Col smoffset={3}></Col>
                </FormGroup>
            </div>)
        } else {
            if(this.state.showfields == 'Vestings') {
                Fields = (<div>
                <FormGroup controlId="parentCo" style={{ 'margin-bottom': '10px' }}> 
                    <Col componentClass={ControlLabel} sm={3}>Parent Company No #</Col>
                    <Col sm={6}>
                        <FormControl onChange={this.handleChange} type="text" />
                    </Col>
                    <Col smoffset={3}></Col>
                </FormGroup>
                <FormGroup controlId="childCo" style={{ 'margin-bottom': '10px' }}>
                    <Col componentClass={ControlLabel} sm={3}>Child Company No #</Col>
                    <Col sm={6}>
                        <FormControl onChange={this.handleChange} type="text" />
                    </Col>
                    <Col smoffset={3}></Col>
                </FormGroup>
                <FormGroup controlId="controlAcct" style={{ 'margin-bottom': '10px' }}>
                    <Col componentClass={ControlLabel} sm={3}>Control Account No #</Col>
                    <Col sm={6}>
                        <FormControl onChange={this.handleChange} type="text" />
                    </Col>
                    <Col smoffset={3}></Col>
                </FormGroup>
                <FormGroup controlId="totalshares" style={{ 'margin-bottom': '10px' }}>
                    <Col componentClass={ControlLabel} sm={3}>Total Shares #</Col>
                    <Col sm={6}>
                        <FormControl onChange={this.handleChange} type="text" />
                    </Col>
                    <Col smoffset={3}></Col>
                </FormGroup>
                <FormGroup controlId="vestingdate" style={{ 'margin-bottom': '10px' }}>
                    <Col componentClass={ControlLabel} sm={3}>Vesting Date</Col>
                    <Col sm={6}>
                        <DatePicker id="example-datepicker" value={this.state.value} onChange={this.handleChangeDate.bind(this)} />
                    </Col>
                    <Col smoffset={3}></Col>
                </FormGroup>                    
                </div>)
            } else {
                if(this.state.showfields == 'Terminations') {
                    Fields = (<div>
                        <FormGroup controlId="parentCo" style={{ 'margin-bottom': '10px' }}> 
                            <Col componentClass={ControlLabel} sm={3}>Parent Company No #</Col>
                            <Col sm={6}>
                                <FormControl onChange={this.handleChange} type="text" />
                            </Col>
                            <Col smoffset={3}></Col>
                        </FormGroup>
                        <FormGroup controlId="childCo" style={{ 'margin-bottom': '10px' }}>
                            <Col componentClass={ControlLabel} sm={3}>Child Company No #</Col>
                            <Col sm={6}>
                                <FormControl onChange={this.handleChange} type="text" />
                            </Col>
                            <Col smoffset={3}></Col>
                        </FormGroup>
                        <FormGroup controlId="controlNo" style={{ 'margin-bottom': '10px' }}>
                            <Col componentClass={ControlLabel} sm={3}>Control No #</Col>
                            <Col sm={6}>
                                <FormControl onChange={this.handleChange} type="text" />
                            </Col>
                            <Col smoffset={3}></Col>
                        </FormGroup>
                        <FormGroup controlId="totalshares" style={{ 'margin-bottom': '10px' }}>
                            <Col componentClass={ControlLabel} sm={3}>Total Shares #</Col>
                            <Col sm={6}>
                                <FormControl onChange={this.handleChange} type="text" />
                            </Col>
                            <Col smoffset={3}></Col>
                        </FormGroup>
                        <FormGroup controlId="issuancedate" style={{ 'margin-bottom': '10px' }}>
                            <Col componentClass={ControlLabel} sm={3}>Date</Col>
                            <Col sm={6}>
                                <DatePicker id="example-datepicker" value={this.state.value} onChange={this.handleChangeDate.bind(this)} />
                            </Col>
                            <Col smoffset={3}></Col>
                        </FormGroup>
                        <FormGroup controlId="disposition" style={{ 'margin-bottom': '10px' }}>
                            <Col componentClass={ControlLabel} sm={3}>Disposition</Col>
                            <Col sm={6}>
                            <FormControl bsSize ="small" componentClass="select" placeholder="select" onChange={this.handleChange}>
                                <option value="retire">Retire</option>
                                <option value="return">Return to Company Treasury</option>
                            </FormControl>
                            </Col>
                            <Col smoffset={3}></Col>
                        </FormGroup>
                    </div>)
                } else {
                    if(this.state.showfields == 'Surrender') {
                        Fields = (<div>
                            <FormGroup controlId="companyno" style={{ 'margin-bottom': '10px' }}>
                                <Col componentClass={ControlLabel} sm={3}>Company No #</Col>
                                <Col sm={6}>
                                    <FormControl onChange={this.handleChange} type="text" />
                                </Col>
                                <Col smoffset={3}></Col>
                            </FormGroup>
                            <FormGroup controlId="totalshares" style={{ 'margin-bottom': '10px' }}>
                                <Col componentClass={ControlLabel} sm={3}>Total Shares #</Col>
                                <Col sm={6}>
                                    <FormControl onChange={this.handleChange} type="text" />
                                </Col>
                                <Col smoffset={3}></Col>
                            </FormGroup>
                            <FormGroup controlId="issuancedate" style={{ 'margin-bottom': '10px' }}>
                                <Col componentClass={ControlLabel} sm={3}>Date</Col>
                                <Col sm={6}>
                                    <DatePicker id="example-datepicker" value={this.state.value} onChange={this.handleChangeDate.bind(this)} />
                                </Col>
                                <Col smoffset={3}></Col>
                            </FormGroup>
                            <FormGroup controlId="disposition" style={{ 'margin-bottom': '10px' }}>
                                <Col componentClass={ControlLabel} sm={3}>Disposition</Col>
                                <Col sm={6}>
                                    <FormControl bsSize ="small" componentClass="select" placeholder="select" onChange={this.handleChange}>
                                        <option value="retire">Retire</option>
                                        <option value="return">Return to Company Treasury</option>
                                    </FormControl>
                                </Col>
                                <Col smoffset={3}></Col>
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
                <Col componentClass={ControlLabel} sm={3}>Request Type</Col>
                <Col sm={6}>
                    <FormControl bsSize ="small" componentClass="select" placeholder="select" onChange={this.handleChange}>
                        <option value="Original">Original Issuance</option>
                        <option value="Grants">Grants</option>
                        <option value="Vestings">Vestings</option>
                        <option value="Terminations">RSP Termination</option>
                        <option value="Surrender">Surrender</option>
                    </FormControl>
                </Col>
                <Col smoffset={3}></Col>
            </FormGroup>
            <FormGroup controlId="priority" style={{ 'margin-bottom': '10px' }}>
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
            { Fields }
        </div>
     );
  }
}
