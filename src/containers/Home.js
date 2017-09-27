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

  handleToUpdate(tabindex){
    alert('We pass argument from Child to Parent: ' + tabindex);
    this.selectTab(tabindex);
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
    if( this.props.match.params.id ) {
      this.state.activeTab = 3;
    }
    return(
      <Tabs activeKey={this.state.activeTab} onSelect={this.selectTab} id="Tab Container" animation={true}>
        <Tab eventKey={1}  title="My Requests">
          <MyTickets handleToUpdate={this.handleToUpdate.bind(this)}/> 
        </Tab>
        <Tab eventKey={2} title="Create Request">
          <NewTicket move2Tab={(tab)=>{this.selectTab(tab)}}/>
        </Tab>
        <Tab eventKey={3} title="Edit Request">
          <Edit tickets={()=> {return this.props.match.params.id}}/>
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