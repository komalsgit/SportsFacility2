import React, { Component } from 'react'
import "./App.css";

import './FacilityOverview.css';
//import { Button } from '@syncfusion/ej2-buttons';
import { Table,Button,ButtonToolbar,Form, Pagination} from 'react-bootstrap';
import { AddFacModel } from './AddFacModel';
import { EditFacModel } from './EditFacModel';
import { EditStatusModel } from './EditStatusModel';
import { Redirect } from 'react-router-dom';
import  { withRouter } from "react-router-dom";
import _ from "lodash";

//const pageSize =10;

  class FacilityOverview extends Component {
               
            constructor(props) {
                super(props);
                this.state = {
                    isAvailable: true,
                    numberOfEquipments: 2,
                    searchTerm1:'',
                 
                  
                };
                this.state={facs:[],locs:[],fax:[],books:[],bookss:[], addModalShow : false,editModalShow : false,editSSModalShow : false,}
               // this.state = { value: 'Kolkata' };
               // this.state = { value: 'ABCPune' };
               // this.state = { value: '9AM-10AM' };
               this.state = { redirect: null, };
                this.state = { searchTerm3:'',};
                this.container = React.createRef();
                this.state = { open: false,show:true
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
               
               
             
                this.state={ paginatedPosts: 0,currentPage:1,pageSize:4,paginatedPosts1: 0,currentPage1:1,pageSize1:3,
                    paginatedPosts2: 0,currentPage2:1,pageSize2:3}
            }
         
          componentDidMount(){
             this.refreshList();
             fetch('https://localhost:44345/api/Locationss')
             .then(response => response && response.json())
             .then(response => {
                 this.setState({locs: response && response});
                 fetch('https://localhost:44345/api/BookingStatusget')
                 .then(response => response && response.json())
                 .then(response => {
                    this.setState({fax: response && response });
                    this.setState({paginatedPosts: (_(response && response).slice(0).take(this.state.pageSize).value())});
                 })
                 fetch('https://localhost:44345/api/TimeslotBookings')
                 .then(response => response && response.json())
                 .then(response => {
                     this.setState({ books: response && response });
                     this.setState({paginatedPosts1: (_(response && response).slice(0).take(this.state.pageSize1).value())});
                 })
                 fetch('https://localhost:44345/api/LocationFacility')
                 .then(response => response && response.json())
                 .then(response => {
                    this.setState({facs: response && response });
                    this.setState({paginatedPosts2: (_(response && response).slice(0).take(this.state.pageSize2).value())});
                 })
                 if ( localStorage.getItem('val')==2){
                    this.setState({ show:false})
                    }
                    else 
                    {
                      this.setState({show:true})
                    }
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
              
                fetch('https://localhost:44345/api/GetBookings')
                .then(response => response && response.json())
                .then(response => {
                    this.setState({ bookss: response && response });
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
  // const pageSize=10;
  if (this.state.redirect) {
    return <Redirect to={this.state.redirect} />
  }
           
             const {facs,locs,books,bookss,fax,facid,facenable,facname,locid,paginatedPosts,currentPage,pageSize,paginatedPosts1,currentPage1,pageSize1,
                paginatedPosts2,currentPage2,pageSize2,show,bookid,timeslotid,locationid,sportsid,facilityid,
                usersid,equipmentid,edate,cdate,bstatusid} = this.state;
             let addModalClose =() => this.setState({addModalShow : false});
             let editModalClose =() => this.setState({editModalShow : false});
             let editSSModalClose = ()=>this.setState({editSSModalShow : false})
           
             const pageCount = fax ? Math.ceil( fax && fax.length/pageSize) : 0;
             if (pageCount ===1) return null ;
             const pages = _.range(1, pageCount +1);

             const pagination = (pageNo) => { 
              this.setState({currentPage : pageNo && pageNo});
              const startIndex = (pageNo -1) * pageSize;  
             const paginatedPost = _(fax && fax).slice(startIndex && startIndex).take(pageSize).value();
              this.setState({paginatedPosts:paginatedPost && paginatedPost})
             }


             const pageCount1 = fax ? Math.ceil( books && books.length/pageSize1) : 0;
             if (pageCount1 ===1) return null ;
             const pages1 = _.range(1, pageCount1 +1);

             const pagination1 = (pageNo1) => { 
              this.setState({currentPage : pageNo1 && pageNo1});
              const startIndex1 = (pageNo1 -1) * pageSize1;  
             const paginatedPost1 = _(books && books).slice(startIndex1 && startIndex1).take(pageSize1).value();
              this.setState({paginatedPosts1:paginatedPost1 && paginatedPost1})
             }


             const pageCount2 = fax ? Math.ceil( facs && facs.length/pageSize2) : 0;
             if (pageCount2 ===1) return null ;
             const pages2 = _.range(1, pageCount2 +1);

             const pagination2 = (pageNo2) => { 
              this.setState({currentPage2 : pageNo2 && pageNo2});
              const startIndex2 = (pageNo2 -1) * pageSize2;  
             const paginatedPost2 = _(facs && facs).slice(startIndex2 && startIndex2).take(pageSize2).value();
              this.setState({paginatedPosts2:paginatedPost2 && paginatedPost2})
             }
           // alert(this.state.pageSize)
             
           


              

          return (       
              <div>
                        <form >
                        <form  class="frm1">
                            <div  >
                                <h1 class="wrapper"> ⚽⚾  ABC Sports Facility  🎾🏀</h1>

                                <div class="tab">
                       
                                <div  className="container" ref={this.container}>
                                    {show ?
                            <button  onClick={()=>this.setState({redirect:"/UserManagement"})}> <a href="UserManagement">💻User Management</a></button>:null}
                            
                            <button type="button" class="button" onClick={this.handleButtonClick}
                        >👲Admin ☰</button>
                         <button onClick={()=>this.setState({redirect:"/Home"})}><a href="Home">⛪Home/Booking</a></button>
                          {this.state.open && (
                        <div class="dropdown">
    <ul>
      <li    className="loginText" onClick={()=>this.setState({redirect:"/admin/facilityoverview"})}>FacilityOverview</li>
      <li  onClick={()=>this.setState({redirect:"/admin/facilitymodifier"})} >FacilityModifier</li>
    </ul>
  </div>
     )}  
                 
                        </div>
                        <br></br>
                        <div  class="tap">
    <button> <a href="/logout" >Logout</a></button>
        </div>
                       
                    </div>
                    </div>
                   
                    <br></br>
                    
                           
                            <br></br>
                            <br></br>
                            <h2 class="h2"> ✦ FACILITIES OVERVIEW  ✦</h2>
                            <br />
                            <Table >
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>LOCATION</th>
                                        <th>FACILITY</th>
                                        
                                        <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    { paginatedPosts2 && paginatedPosts2.map(fac=>
                                    <tr  key={fac.ID && fac.ID}>
                                        <td></td>
                                     <td>{fac && fac.LOCATIONNAME}</td>
                                     <td>{fac && fac.FACILITYNAME}</td>
                                   
                                     <td>
                                        <ButtonToolbar>
                                            <Button 
                                            className="mr-2" variant="info"
                                            onClick={()=>this.setState({editModalShow:true,facid :fac && fac.FACILITYID,facname: fac && fac.FACILITYNAME,locid: fac && fac.LOCATIONID})}
                                            > Edit </Button>

                                            <Button
                                            className="mr-2" 
                                            onClick={()=>this.deleteFac(fac && fac.FACILITYID)} 
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
                                    )}  
                                            
                                  
                                </tbody>
                               </Table>
                               <nav className="d-flex justify-content-center">
    <ul className="pagination">
        {
            pages2.map((page2) => (
            <li className = {
                page2 === currentPage2 ? "page-item active" : "page-item"}>
                <p className="page-link"
                onClick={()=>pagination2(page2 && page2)}>{page2 && page2}</p>
                </li>
            )
            )
        }
       </ul>
 
   </nav>
                          
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
                            <h3 class="h3">BOOKINGS PREVIEW</h3>
                            <br></br>

                            <div>
                              
                        Enter Booking Id : <input type ="number"
                            onChange={(event)=> {
                                this.setState({searchTerm3 : event.target.value})
                            }}
                            /> 
                            <br></br>
                         
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
        </div>
            
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
                                {paginatedPosts1 && paginatedPosts1.map(sport =>
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
                            <nav className="d-flex justify-content-center">
    <ul className="pagination">
        {
            pages1.map((page1) => (
            <li className = {
                page1 === currentPage1 ? "page-item active" : "page-item"}>
                <p className="page-link"
                onClick={()=>pagination1(page1 && page1)}>{page1 && page1}</p>
                </li>
            )
            )
        }
       </ul>
 
   </nav>
                           
                            <br></br>
                            <h4 class="h5">@ABC sports Facility</h4>
                           
                        </form>
                  </form>
                 
                  </div>


               
                );
            }
        
       }
     
export default withRouter(FacilityOverview)