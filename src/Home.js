import React, { Component } from 'react'
//import ReactDOM from 'react-dom';
//import data from "./data.json";
import './HomeApp.css';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { AddBookModal } from './AddBookModal';
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";


class Home extends Component {

	constructor(props) {
	  super(props);
    this.state={locs:[],books:[], addSModalShow: false, editSModalShow: false}
	  this.state = { searchTerm1:'',};
	  this.state = {value: 'ABCPune'};

      this.handleChange = this.handleChange.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
	}
  componentDidMount() {
    this.refreshList();
    fetch('https://localhost:44345/api/Locationss')
    .then(response => response && response.json())
    .then(response => {
        this.setState({locs: response && response});
    }
    )
}
  refreshList() {

    fetch('https://localhost:44345/api/TimeslotBookings')
        .then(response => response && response.json())
        .then(response => {
            this.setState({ books: response && response });
        })
}
componentDidUpdate() {
  this.refreshList();
}
 
	        handleChange(event) {
			this.setState({value: event.target.value});
		    };
	
	  handleSubmit(event) {
		alert('Location is: ' + this.state.value);
		event.preventDefault();
	  };
    deleteBooking(spid) {
      if (window.confirm('Are you sure?')) {
          fetch('https://localhost:44345/api/TimeslotBookings/' + spid, {
              method: 'DELETE',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              }
          })
      }
  }
 

	  render() {
      const {locs,books} = this.state;
      let addSModalClose = () => this.setState({ addSModalShow: false });
      let editSModalClose = () => this.setState({ editSModalShow: false });
	  function shoot() {
	  alert("Form Submitted!");
		  }	
     
		  return (
		 
			  <form class="frm1">
	  
	   <form class="frm1">  
			<div  >
		<h1  class="wrapper">ABC Sports Facility</h1>
		
		<div class="tab">
        <button ><a href="/UserManagement">User Management</a></button>
        <button><a href="/Admin/FacilityOverview">Admin</a></button>
        <button><a href="/Home/Booking">Home/Booking</a></button>
    </div>
   </div>
   <br></br>
        <br></br>
        <label class="lbl1"> Location:
                               <select>
                                  { locs && locs.map(loc => <option value={loc && loc.LOCATIONID}>{ loc && loc.LOCATIONNAME}</option>)}
                                </select>
                            </label>
		<br></br>
    <br></br>
		<h2 class="h2">Booking Page</h2>
		<br></br>
		<br></br>

    <table>
          <thead>
           
          </thead>
          <tbody>
            <tr>
              <th>Select Facility </th>
              <td><label class="lbl2">
         
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="ABCPune">ABCPune</option>
            <option value="PQRMumbai">PQRMumbai</option>
            <option value="OPSDelhi">OPSDelhi</option>
            <option value="BWKolkata">BWKolkata</option>
          </select>
		 </label>
    
		 </td>
     </tr>
     <tr>
     <th>Select Date</th>
     
              <td>	<p class="p">Enter Date:<DatePickerComponent></DatePickerComponent> </p>
		  <br></br></td>
      </tr>
           
			<tr>
      <th>Sports Available</th>
              <td><label class="lbl2" text-align="left">
        
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="cricket">Cricket</option>
            <option value="tennis">Tennis</option>
            <option value="football">Football</option>
            <option value="baseball">Baseball</option>
          </select>
        </label></td>
        </tr>
            <tr>
            <th>TimeSlot</th>
            <td><label class="lbl2">
        
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="7AM-8AM">7AM-8AM</option>
            <option value="8AM-9AM">8AM-9AM</option>
            <option value="9AM-10AM">9AM-10AM</option>
            <option value="10AM-11AM">10AM-11AM</option>
			<option value="11AM-12PM">11AM-12PM</option>
			<option value="12PM-1PM">12PM-1PM</option>
          </select>
		  </label></td>
            </tr>
               </tbody>
			 
        </table>
        
	
		
		  <form onSubmit={this.handleSubmit}>
			 
	  <br></br>
	  <h2 class="h2">Equipments</h2>
	  <br></br>
	  <table>
          <thead>
            <tr>
              <th>Equipments</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CricketBall</td>
              <td>10</td>
            </tr>
			<tr>
              <td>CricketBat</td>
              <td>2</td>
            </tr>
			<button onClick={shoot}>Add</button>
               </tbody>
			 
        </table>
		<br></br>
    Facility  : <input type ="text" placeholder="Search..."
                            onChange={(event)=> {
                                this.setState({searchTerm1 : event.target.value})
                            }}
                            /> 
                            <br></br>
                           <Table>
                            <thead>
                                <tr>
                                   
                                    <th>Booking Id</th>
                                    <th>Facility</th>
                                    <th>Sport</th>
                                    <th>Event Date</th>
                                    <th>Booking Date</th>
                                    <th>TimeSlot</th>
                                    <th>Booking Status</th>
                                    <th>Location</th>
                                   
                                </tr>
                                </thead>
                                </Table>
                                 { books && books.filter((val) => {
                          if (val && val.FACILITYNAME.includes(this.state.searchTerm1)){
                                return val
                            }
                            else if(this.state.searchTerm1 == "") {
                                return null
                                }
                                else {
                                    return null
                                }
      })
                        .map((val,key) => {
                            return (
                                <Table>
                                     <thead>
                                <tr>
                                    
                                    
                                   
                                </tr>
                                </thead>
                                <tbody>
                                <tr key={key}>
                               
                                <td>{val && val.BOOKINGSID}</td>
                                <td>{val && val.FACILITYNAME}</td>
                                <td>{val && val.SPORTNAME}</td>
                                <td>{val && val.EVENTDATE}</td>
                                <td>{val && val.CREATEDDATE}</td>
                                <td>{val && val.TIMESLOT}</td>
                                <td>{val && val.BOOKINGSTATUS}</td>
                                <td>{val && val.LOCATIONNAME}</td>
                                <td>
                                        <ButtonToolbar>
                                            <Button
                                                    className="mr-2"
                                                    onClick={() => this.deleteBooking(val && val.BOOKINGSID)}
                                                    variant="danger">Delete</Button>
                                               
                                            </ButtonToolbar>
                                        </td>
                                </tr>
                             </tbody>
                         
                             </Table>
          )} )}
             <Table>
                        <thead>
                                <tr>
                                    <th>BookingId</th>
                                    <th>Facility</th>
                                    <th>Sport</th>
                                    <th>Event Date</th>
                                    <th>Booking Date</th>
                                    <th>TimeSlot</th>
                                    <th>Booking Status</th>
                                    <th>Location</th>
                                    <th>Actions</th>

                                </tr>
                            </thead>
                            <tbody>
                                {books && books.map(sport =>
                                    <tr key={sport.BOOKINGSID && sport.BOOKINGSID}>

                                        <td>{sport && sport.BOOKINGSID}</td>
                                        <td>{sport && sport.FACILITYNAME}</td>
                                        <td>{sport && sport.SPORTNAME}</td>
                                        <td>{sport && sport.EVENTDATE}</td>
                                <td>{sport && sport.CREATEDDATE}</td>
                                        <td>{sport && sport.TIMESLOT}</td>


                                        <td type="hidden">{sport && sport.BOOKINGSTATUS}</td>
                                        <td type="hidden">{sport && sport.LOCATIONNAME}</td>
                                        <td>
                                        <ButtonToolbar>
                                            <Button
                                                    className="mr-2"
                                                    onClick={() => this.deleteBooking(sport && sport.BOOKINGSID)}
                                                    variant="danger">Delete</Button>
                                               
                                            </ButtonToolbar>
                                        </td>
                                       
                                    </tr>)}
                            </tbody>
                        </Table>
                        <br></br>
                        <ButtonToolbar>
                            <Button
                                variant='primary'
                                onClick={() => this.setState({ addSModalShow: true })}
                            >Book Now
                            </Button>
                            <AddBookModal
                                show={this.state.addSModalShow}
                                onHide={addSModalClose}
                            />
                            </ButtonToolbar>
                        
               
                        <br></br>

                        <br></br>
                        <h2 class="h2">Booking Management</h2>
                        <br></br>
                        <div>
                            <p class="p">Enter Date: <DatePickerComponent></DatePickerComponent></p>
                            <br />
                            <br></br>
                           
                        </div>
                        <br></br>
                        <br />
                       
                        
                         
                 
                 
                 
    
		<table>
          <thead>
            <tr>
              <th colSpan="3">Equipment Summary</th>
              
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CricketBall</td>
              <td>5</td>
			  <td><button onClick= "myFunction()">Edit</button></td>
            </tr>
			<tr>
              <td>CricketBat</td>
              <td>2</td>
			  <td><button onClick= "myFunction()">Edit</button></td>
            </tr>
			
			
               </tbody>
			 
        </table>
        <br/>
		
		<button onClick={shoot} text-align="center">Book Now</button>
		<br>
		</br>
    <br></br>
		<h2 class="h2">Upcoming Events</h2>
		<table>
          <thead>
            <tr>
              <th>BookingId</th>
              <th>Date</th>
			  <th>Venue</th>
			  <th>Timeslot</th>
			  <th>Sports</th>
			  <th>Equipments Booked</th>
            </tr>
          </thead>
          <tbody>
           
            <tr>
              <td>1001</td>
              <td>12-05-2021</td>
			  <td>ABCPune </td>
			  <td>9AM-10AM </td>
			  <td>Cricket </td>
			  <td>Bat=2,Ball=4
			   </td>
            </tr>
            
              
          </tbody>
        </table>
	  
	
      </form>
		</form>
		</form>
		
	  
	  );
	}
}
	  
;
  
 // ReactDOM.render(
	//<Form />,
	//document.getElementById('root')
 // );
//export default Form

  

export default Home