import React, { Component } from 'react'
import "./App.css";

import './FacilityOverview.css';
//import { Button } from '@syncfusion/ej2-buttons';
import { Table,Button,ButtonToolbar} from 'react-bootstrap';
import { AddFacModel } from './AddFacModel';
import { EditFacModel } from './EditFacModel';

  class FacilityOverview extends Component {
               
            constructor(props) {
                super(props);
                this.state = {
                    isAvailable: true,
                    numberOfEquipments: 2
                  
                };
                this.state={facs:[],locs:[], addModalShow : false,editModalShow : false}
                this.state = { value: 'Kolkata' };
                this.state = { value: 'ABCPune' };
                this.state = { value: '9AM-10AM' };

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
          }
       
                handleChange(event) {
                this.setState({ value: event.target.value });
            }

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
             const {facs,locs,facid,facenable,facname,locid} = this.state;
             let addModalClose =() => this.setState({addModalShow : false});
             let editModalClose =() => this.setState({editModalShow : false});
             
           


              

          return (       
              <div>
                        <form >
                        <form  class="frm1">
                            <div  >
                                <h1 class="wrapper">ABC Sports Facility</h1>

                                <div class="tab">
                                    <button > <a href="/UserManagement">User Management</a></button>
                                    <button><a href="/Admin/FacilityModifier">Admin</a></button>
                                    <button><a href="/Home">Home/Booking</a></button>
                                </div>
                            </div>
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
                            <br></br>
                            <div>
                                <p class="p">
                                    <label for="tags" class="p">Search Facility :  </label>
                                    <input id="tags" autofocus placeholder=" Enter Facility Name" ></input>
                                </p>
                            </div>
                            <br />
                            <br></br>
                            <br></br>
          
                            <Table >
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
                                    { facs && facs.map(fac=>
                                    <tr  key={fac.ID && fac.ID}>
                                     <td>{fac && fac.ID}</td>
                                    
                                   <td>{fac && fac.FACILITYID}</td>
                                   
                                     <td>{fac && fac.FACILITYNAME}</td>
                                   
                                  <td>{fac && fac.LOCATIONNAME}</td>
                                    <td type="hidden">{fac && fac.FACILITYENABLED}</td>
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
                            <br />
                            <br></br>
                            <br></br>
                            <h2 class="h2">Booking Preview</h2>
                            <br></br>

                            <div>
                                <p  >Enter Booking Id : <input type="text" autofocus placeholder=" Enter Booking Id"></input></p>

                                <button><a href="/Home/Booking">Modify Booking</a></button>

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