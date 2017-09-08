import React, { Component } from "react";
import {createStore} from 'redux';
import { Link } from 'react-router-dom'
import { PageHeader, ListGroup,ListGroupItem,Button,Nav,NavItem,Navbar,Tabs,Tab} from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import "./Home.css";
import NewTicket from './NewTicket';
import MyTickets from './MyTickets';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
      isLoading: true,
      tickets: [],
      //key:0
    };
    
  }

  getInitialState() {
    this.setState({key:1});
    return {
      key: this.key
    };
  }
  
  selectTab(tab) {
   // alert('selected ' + key);
    this.setState({key:tab});
  }

  

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
  
    try {
      fetch('/tickets')
      .then(res => res.json())
      .then(tickets => this.setState({ tickets }));
    } catch (e) {
      alert(e);
    }
  
    this.setState({ isLoading: false });
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
 
  render1(){
    let store = createStore(this.selectTab)  
    return(
     <Tabs activeKey={this.state.key} onSelect={this.selectTab} id="controlled-tab-example" bsStyle="pills">
        <Tab eventKey={1} title="My Tickets">
          <MyTickets {...this.props}/> 
         </Tab>
       <Tab eventKey={2} title="Create Ticket">
          <NewTicket {...this.props} store = {this.store}/>
        </Tab>
        <Tab eventKey={3} title="Edit Ticket" >Edit Ticket</Tab>
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
        <p>A simple ticketing system</p>
      </div>
    );
  }

  renderNotes() {
    return (
      <div className="tickets">
        <PageHeader>Your tickets</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderNotesList(this.state.tickets)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.render1() : this.renderLander()}
      </div>
    );
  }
}