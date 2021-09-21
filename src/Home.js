import React, { Component } from 'react'
//import ReactDOM from 'react-dom';
//import data from "./data.json";
import './FacilityOverview.css';
import './HomeApp.css';
import {Table, Button, ButtonToolbar } from 'react-bootstrap';
import { AddBookModal } from './AddBookModal';
//import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
//import  Pagination  from './Pagination';
//import { TablePagination } from 'react-pagination-table';
//import Pagination from '@material-ui/lab/Pagination';
//import TablePagination from '@material-ui/core/TablePagination';
//import ReactPaginate from 'react-paginate';
import  { withRouter } from "react-router-dom";
import reactDOM from 'react-dom';


class Home extends Component {

	constructor(props) {
	  super(props);
    this.state={locs:[],books:[],bookies:[], addSModalShow: false, editSModalShow: false,totalResults: 0,currentPage:1}
	  this.state = { searchTerm1:'',show:true,show1:true
     //   offset: 0,
    //  tableData: [],
     // orgtableData: [],
     // perPage: 1,
     // currentPage: 0
    };
	  this.state = {value: 'ABCPune'};
      this.state = {black: true};
      this.handleChange = this.handleChange.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
	}
    changeColor(){
        this.setState({black: !this.state.black})
     }
    
  componentDidMount() {
    this.refreshList();
    fetch(`https://localhost:44345/api/GetBookingsFromId?USERID=${localStorage.getItem('val1')}`)
    .then(response => response && response.json())
    .then(response => {
       this.setState({bookies: response && response });
    })

    fetch('https://localhost:44345/api/Locationss')
    .then(response => response && response.json())
    .then(response => {
        this.setState({locs: response && response});
        if ( localStorage.getItem('val')==1){
        this.setState({ show:false})
        }
        else 
        {
          this.setState({show:true})
        }

        if ( localStorage.getItem('val')==2){
          this.setState({ show1:false})
          }
          else 
          {
            this.setState({show1:true})
          }
    }
    )
}
  refreshList() {

    fetch('https://localhost:44345/api/TimeslotBookings')
        .then(response => response && response.json())
       // .then(response=>{
      //  const data = response && response.data;
       // const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        .then(response => {
            this.setState({ books: response && response, totalResults:response.total_results,
               
             //   pageCount: Math.ceil(data.length / this.state.perPage),
              //  orgtableData:response.data,
               // books:slice
             });
        })
   // })
}
//nextPage = (pageNumber) =>{
  
  //  fetch(`https://localhost:44345/api/TimeslotBookings/&page=${pageNumber}`)
   // .then(response => response && response.json())
  //  .then(response => {
     //   this.setState({ books: response && response , currentPage: pageNumber });
  //  })

 //}
componentDidUpdate() {
  this.refreshList();
}
 
	        handleChange(event) {
			this.setState({value: event.target.value});
		    };
	
	  handleSubmit(event) {
		//alert('Location is: ' + this.state.value);
		event.preventDefault();
	  };
    deleteBooking(spid) {
      if (window.confirm('Are you sure ❔❓')) {
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
      const {locs,books,show,bookies,show1} = this.state;
     // const numberPages = Math.floor(this.state.totalResults / 1);
      let addSModalClose = () => this.setState({ addSModalShow: false });
      let editSModalClose = () => this.setState({ editSModalShow: false });
      let btn_class = this.state.black ? "blackButton" : "whiteButton";
	 	
     
		  return (
		 
			  <form class="frm1">
	  
	   <form class="frm1">  
			<div  >
          
		<h1  class="wrapper"> ⚽⚾  ABC Sports Facility  🎾🏀</h1>
        <h3> </h3>
      
		<div class="tab">
      
        <div  className="container" ref={this.container}>
         {show?
          <a>
         {show1?
        <button><a href="/UserManagement"> 💻 User Management</a></button>:null}
           { show ? 
        <button><a href="/Admin/FacilityOverview"> 👲 Admin</a></button>:null} </a>:null}
        <button  className={btn_class}
                         onClick={this.changeColor.bind(this)}><a href="/Home/Booking"></a> ⛪ Home/Booking</button>
                       
                    
    </div>
    <br></br>
    <div  class="tap">
        <div>
                <button> <a href="/logout" >Logout</a></button>   
                </div> 
                </div>   
    <div >
   
        </div>
       
   </div>
   </div>
   <br></br>
        <br></br>
		<br></br>
    <br></br>
		<h2 class="h2">  🥎   __BOOKING__   🥎 </h2>
	
		<br></br>
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
        {bookies && bookies.map(sport =>
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
    <form onSubmit={this.handleSubmit}>
			 
	  
	 
		
                       
                        <ButtonToolbar>
                         <Button
                                variant='primary'
                                onClick={() => this.setState({ addSModalShow: true })}
                            >Book Now ❗❗
                            </Button>
                            <AddBookModal
                                show={this.state.addSModalShow}
                                onHide={addSModalClose}
                            />
                            </ButtonToolbar>
                        
               
                        <br></br>
                        <br></br>
                       
                        
                        <h4 class="h5">@ABC sports Facility</h4>
                           </form>
		</form>
		</form>
		
	  
	  );
	}
}
	  
;
  
  //ReactDOM.render(
	//<Home />,
	//document.getElementById('root')
  //);
//export default Form

  

export default  withRouter(Home);