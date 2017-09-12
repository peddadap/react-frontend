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

    this.state = {
      
      isLoading: true,
      tickets: [],
      };
    
  }

  getInitialState() {
    
    return {
      key: 1
    };
  }
  
  selectTab(tab) {
    //alert('selected #' + tab);
   //console.log('>>>> Tab Selected' + this.state.key);
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
 
  renderTabs(){
    console.log(">>>> Rendering all Tabs");
    return(
     <Tabs activeKey = {this.state.key} onSelect={this.selectTab} id = "Tab Container" animation = {true} >
        <Tab eventKey={1}  title="My Tickets" >
          <MyTickets /> 
         </Tab>
       <Tab eventKey = {2} title="Create Ticket" >
          <NewTicket  move2Tab = {(tab)=>{this.selectTab(tab)}} />
        </Tab>
<<<<<<< HEAD
        <Tab eventKey={3}  title="Edit Ticket" >Edit Ticket</Tab>
=======
        <Tab eventKey={3} title="Edit Ticket" >
          <Edit  {...this.props}/>
        </Tab>
>>>>>>> 07e496015fac1b502c6aa6844d78e612c3536f31
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

 /* renderNotes() {
    console.log(" Home rendered notes")
    return (
      <div className="tickets">
        <PageHeader>Your tickets</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderNotesList(this.state.tickets)}
        </ListGroup>
      </div>
    );
  }*/

  render() {
    console.log(">>> Home component render() method called");
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderTabs() : this.renderLander()}
      </div>
    );
  }
}