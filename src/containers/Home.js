//import modules
import React, { Component } from "react";
import { Tabs, Tab } from "react-bootstrap";

//Load Application Components
import NewTicket from './NewTicket';
import MyTickets from './MyTickets';
import Edit from './Edit';

//import config not needed here
//Not required here

//import data
//Not required here

//import CSS
import "../styles/Home.css";

//Home Class
export default class Home extends Component {

  //Constructor
  constructor(props) {
    super(props);
    this.selectTab = this.selectTab.bind(this);
    this.state = {
      isLoading: true,
    };  
  }

  getInitialState() {  
    return { activeTab: 1 };
  }

  handleToUpdate(tabindex, requestId, requestStatus){
    this.selectTab(tabindex);
    this.setrequestId(requestId);
    this.setrequestStatus(requestStatus);
  }

  selectTab(tab) {
    this.setState({activeTab: tab}, function(){console.log(this.state.activeTab);});
  }

  setrequestId(requestId) {
    this.setState({requestId: requestId}, function(){console.log(this.state.requestId);});
  }

  setrequestStatus(requestStatus) {
    this.setState({ requestStatus: requestStatus }, function(){ console.log(this.state.requestStatus); });
  }

  dateFormatter(cell, row){
    return ( new Date(cell) ).toISOString().split('T')[0];
  }
 
  renderTabs() {
    return(
        <Tabs activeKey={ this.state.activeTab } onSelect={ this.selectTab } id="Tab Container" animation={ true }>
          <Tab eventKey={1} title="My Requests">
            <MyTickets 
              handleToUpdate={ this.handleToUpdate.bind(this) } 
              requestStatus={ this.state.requestStatus } 
              requestId={ this.state.requestId }
              actTab={ this.state.activeTab }
            /> 
          </Tab>
          <Tab eventKey={2} title="Create Request">
            <NewTicket 
              move2Tab={(tab)=>{this.selectTab(tab)}} 
              handleToUpdate={ this.handleToUpdate.bind(this) }
            />
          </Tab>
          <Tab eventKey={3} title="Edit Request">
            <Edit 
              handleToUpdate={ this.handleToUpdate.bind(this) } 
              requestStatus={ this.state.requestStatus } 
              requestId={ this.state.requestId }
            />
          </Tab>
        </Tabs>
    )
  }

  renderLander() {
    return (<div className="lander"></div>);
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderTabs() : this.renderLander()}
      </div>
    );
  }

}
