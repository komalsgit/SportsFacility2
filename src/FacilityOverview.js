import React, { Component } from 'react'
import "./App.css";

import './FacilityOverview.css';
//import { Button } from '@syncfusion/ej2-buttons';
import { Table,Button,ButtonToolbar,Form} from 'react-bootstrap';
import { AddFacModel } from './AddFacModel';
import { EditFacModel } from './EditFacModel';
import { Redirect } from 'react-router-dom';

  class FacilityOverview extends Component {
               
            constructor(props) {
                super(props);
                this.state = {
                    isAvailable: true,
                    numberOfEquipments: 2,
                    searchTerm1:'',
                  
                };
                this.state={facs:[],locs:[],books:[], addModalShow : false,editModalShow : false}
               // this.state = { value: 'Kolkata' };
               // this.state = { value: 'ABCPune' };
               // this.state = { value: '9AM-10AM' };
               this.state = { redirect: null, };
                this.state = { searchTerm3:'',};
                this.container = React.createRef();
                this.state = { open: false,
                  };
                  this.handleButtonClick = () => {
                    this.setState((state) => {
                      return {
                        open: !state.open,
                      };
                    });
                }

                this.handleInputChange = this.handleInputChange.bind(this);
                this.state = { value: 'football' };

                this.handleChange = this.handleChange.bind(this);
                this.handleSubmit = this.handleSubmit.bind(this);
            }
         
          componentDidMount(){
             this.refreshList();
             fetch('https://localhost:44345/api/Locationss')
             .then(response => response && response.json())
             .then(response => {
                 this.setState({locs: response && response});
             }
             )
             document.addEventListener("mousedown", this.handleClickOutside);
          }
          componentWillUnmount() {
            document.removeEventListener("mousedown", this.handleClickOutside);
          }
          handleClickOutside = (event) => {
            if (
              this.container.current &&
              !this.container.current.contains(event.target)
            ) {
              this.setState({
                open: false,
              });
            }
          };
       
                handleChange(event) {
                this.setState({ value: event.target.value });
            }
        //      handleAlternate(event) {
          //        event.preventDefault();
          //  fetch(`https://localhost:44345/api/BookingBasedonId?BOOKINGSID=${event.target.BOOKINGSID.value}`)
             //       .then(response => response.json())
             // .then(data => {
              //      this.setState({ books: data })
               //   });
                 //  }
             

            handleSubmit(event) {
                alert('Your Location: ' + this.state.value);
                event.preventDefault();
            };


            handleInputChange(event) {
                const target = event.target;
                const value = target.type === 'checkbox' ? target.checked : target.value;
                const name = target.name;

                this.setState({
                    [name]: value
                });

                }
            refreshList(){
            
              fetch('https://localhost:44345/api/LocationFacility')
              .then(response => response && response.json())
             .then(response => {
              this.setState({facs: response && response });
               
                })
                fetch('https://localhost:44345/api/TimeslotBookings')
                .then(response => response && response.json())
                .then(response => {
                    this.setState({ books: response && response });
                })
                
           }
           componentDidUpdate(){
               this.refreshList();
           }
           deleteFac(facid)
           {
               if(window.confirm('Are you sure?'))
               {
                fetch ('https://localhost:44345/api/Values/'+facid,{
                    method: 'DELETE',
                     headers:{
                         'Accept':'application/json',
                         'Content-Type':'application/json' 
                     }
               })
           }
        }

         
         render() {
            if (this.state.redirect) {
                return <Redirect to={this.state.redirect} />
              }
             const {facs,locs,books,facid,facenable,facname,locid} = this.state;
             let addModalClose =() => this.setState({addModalShow : false});
             let editModalClose =() => this.setState({editModalShow : false});
             
           


              

          return (       
              <div>
                        <form >
                        <form  class="frm1">
                            <div  >
                                <h1 class="wrapper">ABC Sports Facility</h1>

                                <div class="tab">
                       
                                <div  className="container" ref={this.container}>
                            <button  onClick={()=>this.setState({redirect:"/UserManagement"})}> <a href="UserManagement">User Management</a></button>
                            
                            <button type="button" class="button" onClick={this.handleButtonClick}
                        >Admin ☰</button>
                         <button  onClick={()=>this.setState({redirect:"/Home"})}><a href="Home">Home/Booking</a></button>
                          {this.state.open && (
                        <div class="dropdown">
    <ul>
      <li><a href="FacilityOverview">FacilityOverview</a></li>
      <li><a href="FacilityModifier">FacilityModifier</a></li>
    </ul>
  </div>
     )}              
                        </div>
                       
                    </div>
                    </div>
                   
                    <br></br>
                            <br></br>
                          
                            <label class="lbl1">
                                Location:
                               
                                <select>
                                  { locs && locs.map(loc => <option value={loc && loc.LOCATIONID}>{ loc && loc.LOCATIONNAME}</option>)}
                                </select>
                            </label>
                           
                            <br></br>
                            <br></br>
                            <h2 class="h2">Facilities Overview</h2>
                            <br />
                            <br></br>
                            Location :<input type ="text"
                      onChange={(event)=> {
                          this.setState({searchTerm1 : event.target.value})
                      }}
                      /> 
                 
                          { facs && facs.filter((val) => {
                           if (val && val.LOCATIONNAME.includes(this.state.searchTerm1)){
                             return val             
                         }
                           else if(this.state.searchTerm1 == "") {
                             return 0
                           }
                            })
                      .map((val,key) =>{
                          return (
                                <Table>
                                <thead>
                                    <tr>
                                         <th></th>
                                         <th>FACILITYID</th>
                                        <th>FACILITYNAME</th>
                                        <th>LOCATION</th>
                                        <th type="hidden"></th>
                                        <th>Actions</th>
                                        </tr>
                                    </thead>
                            <tbody>
                            <tr key={key}>
                                    
                                        <td>{val && val.FACILITYID}</td>
                                        <td>{val && val.FACILITYNAME}</td>
                                        <td>{val && val.LOCATIONNAME}</td>
                                        <td>{val && val.LOCATIONNAME}</td>
                                        <td  type="hidden">{val && val.FACILITYENABLED}</td>
                                        <td>
                                        <ButtonToolbar>
                                            <Button 
                                            className="mr-2" variant="info"
                                            onClick={()=>this.setState({editModalShow:true,facid : val && val.FACILITYID,facname: val && val.FACILITYNAME,locid: val && val.LOCATIONID})}
                                            > Edit </Button>

                                            <Button
                                            className="mr-2" 
                                            onClick={()=>this.deleteFac(val && val.FACILITYID)} 
                                            variant="danger">Delete</Button>
                                            <EditFacModel
                                                show={this.state.editModalShow}
                                                onHide={editModalClose}
                                                facid={facid}
                                                facname={facname}
                                                facenable={facenable}
                                                locid={locid}
                                            />
                                        </ButtonToolbar>
                                    </td>
                                           
                                        </tr>
                                        </tbody>
                            </Table>
                        )
                          })
                   }
                        <br></br>
                       <br></br>
                                 <ButtonToolbar>
                                   <Button
                                    variant ='primary'
                                   onClick={()=> this.setState({addModalShow: true})}
                                   >Add Facility
                                   </Button>
                                   <AddFacModel
                                       show={this.state.addModalShow}
                                       onHide={addModalClose}
                                   />

                               </ButtonToolbar>
                            <br></br>
                            <br></br>
                            <h3 class="h3">Booking Preview</h3>
                            <br></br>

                            <div>
                              
                        Enter Booking Id : <input type ="number"
                            onChange={(event)=> {
                                this.setState({searchTerm3 : event.target.value})
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
                          if ( val && val.BOOKINGSID == this.state.searchTerm3 ){
                                return val
                            }
                            else if(this.state.searchTerm3 == null) {
                                return 0
                                }
                                else {
                                    return 0
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
          

                                <Button ><a  className="btn btn-primary" href="/Home/Booking">Modify Booking</a></Button>

                            </div>
                            <br></br>
                            <br />
                           
                        </form>
                  </form>
                 
                  </div>


               
                );
            }
        
       }
     
export default FacilityOverview