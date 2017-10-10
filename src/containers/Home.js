import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { Tabs,Tab} from "react-bootstrap";
import "./Home.css";
import NewTicket from './NewTicket';
import MyTickets from './MyTickets';
import Edit from './Edit';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.selectTab = this.selectTab.bind(this);
    var handleToUpdate  = this.handleToUpdate.bind(this);
    this.state = {
      isLoading: true,
    };  
  }

  handleToUpdate(tabindex, requestId, requestStatus){
    this.selectTab(tabindex);
    this.setrequestId(requestId);
    this.setrequestStatus(requestStatus);
  }

  getInitialState() {  
    return {
      activeTab: 1
    };
  }
  
  selectTab(tab) {
    this.setState({
      activeTab: tab
    }, function(){
      console.log(this.state.activeTab);
    });
  }

  setrequestId(requestId) {
    this.setState({
      requestId: requestId
    }, function(){
      console.log(this.state.requestId);
    });
  }

  setrequestStatus(requestStatus) {
    this.setState({
      requestStatus: requestStatus
    }, function(){
      console.log(this.state.requestStatus);
    });
  }

  colFormatter = (cell, row) => {
    return (
      <Link to={"/ticket/"+cell}>
        {cell}
      </Link>
    )
  }

  dateFormatter(cell, row){
    var cdate = (new Date(cell)).toISOString().split('T')[0]
    return  cdate;
  }
 
  renderTabs(){
    if( this.state.activeTab == 3 ) {
      this.state.activeTab = 3;
    }
    if( this.state.activeTab == 1 ) {
      this.state.activeTab = 1;
    }
    return(
      <Tabs activeKey={this.state.activeTab} onSelect={this.selectTab} id="Tab Container" animation={true}>
        <Tab eventKey={1}  title="My Requests">
          <MyTickets 
            handleToUpdate={this.handleToUpdate.bind(this)} 
            requestStatus={ this.state.requestStatus } 
            requestId={ this.state.requestId }
            actTab={ this.state.activeTab }
          /> 
        </Tab>
        <Tab eventKey={2} title="Create Request">
          <NewTicket move2Tab={(tab)=>{this.selectTab(tab)}} handleToUpdate={this.handleToUpdate.bind(this)}/>
        </Tab>
        <Tab eventKey={3} title="Edit Request">
          <Edit 
            handleToUpdate={this.handleToUpdate.bind(this)} 
            requestStatus={ this.state.requestStatus } 
            requestId={ this.state.requestId }
          />
        </Tab>
      </Tabs>
    )
  }

  handleNoteClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute("href"));
  }

  renderLander() {
    return (
      <div className="lander">   
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderTabs() : this.renderLander()}
      </div>
    );
  }
}