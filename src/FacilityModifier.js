import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import './FacilityModifier.css';
import { AddSportModal } from './AddSportModal';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
//import FacilityOverview from './FacilityOverview';
import { EditTimeSlot } from './EditTimeSlot';
import { AddEquipmentModel } from './AddEquipmentModel';
import { Redirect } from 'react-router-dom';
import  { withRouter } from "react-router-dom";
import _ from "lodash";



class FacilityModifier extends Component {
        constructor(props) {
        super(props);
        this.state = {
            isAvailable: true,
            numberOfEquipments: 2,
            searchTerm:'',
            searchTerm1:'',
            searchTerm2:'',
             };
             this.state = { redirect: null, };
        this.state = { sports: [], equipments: [], locs: [],sportse:[],sportss:[], addSModalShow: false, editSModalShow: false, addPModalShow: false }
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
       
      //  this.state = { value: 'ABCPune' };
      //  this.state = { value: '9AM-10AM' };

        this.handleInputChange = this.handleInputChange.bind(this);
       // this.state = { value: 'football' };
        this.state = {black: true};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { paginatedPosts3: 0,currentPage3:1,pageSize3:4, };
    }
    changeColor(){
        this.setState({black: !this.state.black})
     }
    componentDidMount() {
        this.refreshList();
        fetch('https://localhost:44345/api/Locationss')
        .then(response => response && response.json())
        .then(response => {
            this.setState({ locs: response && response });
        }
        )
        fetch('https://localhost:44345/api/SportsGetNew')
        .then(response => response && response.json())
        .then(response => {
            this.setState({ sportss: response && response });
            this.setState({paginatedPosts3: (_(response && response).slice(0).take(this.state.pageSize3).value())});
                });
        document.addEventListener("mousedown", this.handleClickOutside);
        if ( localStorage.getItem('val')==2){
            this.setState({ show:false})
            }
            else 
            {
              this.setState({show:true})
            }
    }
   // componentDidMount() {
     //   document.addEventListener("mousedown", this.handleClickOutside);
   // }
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
   // componentDidMount() {
      //  fetch('https://localhost:44345/api/Locationss')
          //  .then(response => response && response.json())
          //  .then(response => {
           //     this.setState({ locs: response && response });
           // }
           // )
  //  }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
   
    refreshList() {
             fetch('https://localhost:44345/api/Sports')
            .then(response => response && response.json())
            .then(response => {
                this.setState({ sports: response && response });

             fetch('https://localhost:44345/api/EquipmentSport')
            .then(response => response.json())
            .then(data => {
                this.setState({ equipments: data })
              
                    });
            })
    }
    componentDidUpdate() {
        this.refreshList();
    }
    handleSubmit(event) {
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
    deleteFac(spid) {
        if (window.confirm('Are you sure?')) {
            fetch('https://localhost:44345/api/TimeSlots/' + spid, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }
  

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }
       
        const { sports,equipments,sportss, locs, slotname, sportid,slotid,paginatedPosts3,currentPage3,pageSize3,show} = this.state;
        let addSModalClose = () => this.setState({ addSModalShow: false });
        let editSModalClose = () => this.setState({ editSModalShow: false });
        let addPModalClose = () => this.setState({ addPModalShow: false });
        let btn_class = this.state.black ? "blackButton" : "whiteButton";

        const pageCount3 = sportss ? Math.ceil( sportss && sportss.length/pageSize3) : 0;
        if (pageCount3 ===1) return null ;
        const pages3 = _.range(1, pageCount3 +1);

        const pagination3 = (pageNo) => { 
         this.setState({currentPage3 : pageNo && pageNo});
         const startIndex3 = (pageNo -1) * pageSize3;  
        const paginatedPost3 = _(sportss && sportss).slice(startIndex3 && startIndex3).take(pageSize3).value();
         this.setState({paginatedPosts3:paginatedPost3 && paginatedPost3})
        }
      
             return (
          

            <form class="frm1">
               <form >
                    <div>
                        <h1 class="wrapper"> ⚽⚾  ABC Sports Facility  🎾🏀</h1>
                         <div class="tab">
                        <div  className="container" ref={this.container}>
                        { show ? 
                            <button onClick={()=>this.setState({redirect:"/UserManagement"})}>💻 User Management</button>:null}
                            <button type="button" class="button" onClick={this.handleButtonClick}
                        > 👲Admin ☰</button>
                         <button  onClick={()=>this.setState({redirect:"/Home"})}> ⛪Home/Booking</button>
                          {this.state.open && (
                        <div class="dropdown">
    <ul>
      <li onClick={()=>this.setState({redirect:"/admin/facilityoverview"})}>FacilityOverview</li>
      <li   className="loginText" onClick={()=>this.setState({redirect:"/admin/facilitymodifier"})}>FacilityModifier</li>
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
                    <h2 class="h2"> ✦ FACILITY MODIFIER  ✦</h2>
                    <br></br>

                    <form onSubmit={this.handleSubmit}>
                         <br></br>
                        <h3 class="h3">SPORTS MANAGEMENT</h3>
                        <br></br>
                        ✦ Facility :  <input type ="text" 
                      onChange={(event)=> {
                          this.setState({searchTerm1 : event.target.value})
                      }}
                      /> 
                 
                          { sportss && sportss.filter((val) => {
                           if (val && val.FACILITYNAME.includes(this.state.searchTerm1)){
                             return val             
                         }
                           else if(this.state.searchTerm1 == null) {
                             return null
                           }
                            })
                      .map((val,key) =>{
                          return (
                                <Table>
                                <thead>
                                <tr>
                                    <th>Location</th>
                                    <th>Facility</th>
                                    <th>SportName</th>
                                    </tr>
                            </thead>
                            <tbody>
                            <tr key={key}>
                                        <td>{val && val.LOCATIONNAME}</td>
                                        <td>{val && val.FACILITYNAME}</td>
                                        <td>{val && val.SPORTNAME}</td>
                                      
                                       
                                        <td>
                                            <ButtonToolbar>
                                                <Button
                                                    className="mr-2" variant="info"
                                                    onClick={() => this.setState({ editSModalShow: true, slotid: val && val.TIMESLOTID, slotname: val && val.TIMESLOT, sportid: val && val.SPORTSID })}
                                                >Edit  </Button>


                                                <Button
                                                    className="mr-2"
                                                    onClick={() => this.deleteFac(val && val.SPORTID)}
                                                    variant="danger">Delete</Button>
                                                <EditTimeSlot
                                                    show={this.state.editSModalShow}
                                                    onHide={editSModalClose}
                                                    slotid={slotid}
                                                    slotname={slotname}
                                                    sportid={sportid}

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
                     
                    
                          
                         
                 
                 
                 
                 
                 
                        ✦ Sport : <input type ="text"
                      onChange={(event)=> {
                          this.setState({searchTerm : event.target.value})
                      }}
                      /> 
                 
                          { sportss && sportss.filter((val) => {
                           if (val && val.SPORTNAME.includes(this.state.searchTerm)){
                             return val
                         }
                           else if(this.state.searchTerm == "") {
                             return 0
                           }
                            })
                      .map((val,key) =>{
                          return (
                                <Table>
                                <thead>
                                <tr>
                                    <th>Location</th>
                                    <th>Facility</th>
                                    <th>Sport</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                            <tr key={key}>
                                        <td>{val && val.LOCATIONNAME}</td>
                                        <td>{val && val.FACILITYNAME}</td>
                                        <td>{val && val.SPORTNAME}</td>
                                       
                                        <td>
                                            <ButtonToolbar>
                                                <Button
                                                    className="mr-2" variant="info"
                                                    onClick={() => this.setState({ editSModalShow: true, slotid: val && val.TIMESLOTID, slotname: val && val.TIMESLOT, sportid: val && val.SPORTSID })}
                                                >Edit  </Button>


                                                <Button
                                                    className="mr-2"
                                                    onClick={() => this.deleteFac(val && val.SPORTID)}
                                                    variant="danger">Delete</Button>
                                                <EditTimeSlot
                                                    show={this.state.editSModalShow}
                                                    onHide={editSModalClose}
                                                    slotid={slotid}
                                                    slotname={slotname}
                                                    sportid={sportid}

                                                />
                                            </ButtonToolbar>
                                        </td>
                                        </tr>
                                        </tbody>
                            </Table>
                        )
                          })
                   }
                   
                           
                         <br />
                         <br />
                         <Table>
                        <thead>
                                <tr>
                                    <th></th>
                                    <th>Location</th>
                                    <th>Facility</th>
                                    <th>Sports Available</th>
                                    <th>Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {paginatedPosts3 && paginatedPosts3.map(sport =>
                                    <tr key={sport.SPORTSID && sport.SPORTSID}>
                                        <td></td>
                                        <td type="hidden">{sport && sport.LOCATIONNAME}</td>
                                        <td type="hidden">{sport && sport.FACILITYNAME}</td>
                                        <td>{sport && sport.SPORTNAME}</td>
                                        <td>
                                            <ButtonToolbar>
                                                    <Button
                                                    className="mr-2"
                                                    onClick={() => this.deleteFac(sport && sport.SPORTID)}
                                                    variant="danger">Delete</Button>
                                            </ButtonToolbar>
                                        </td>
                                    </tr>)}
                            </tbody>
                        </Table>
                        <nav className="d-flex justify-content-center">
    <ul className="pagination">
        {
            pages3.map((page) => (
            <li className = {
                page === currentPage3 ? "page-item active" : "page-item"}>
                <p className="page-link"
                onClick={()=>pagination3(page && page)}>{page && page}</p>
                </li>
            )
            )
        }
       </ul>
 
   </nav>
                         <br />
                         <br />
                            <ButtonToolbar>
                            <Button
                                variant='primary'
                                onClick={() => this.setState({ addSModalShow: true })}
                            >Add Sport
                            </Button>
                            <AddSportModal
                                show={this.state.addSModalShow}
                                onHide={addSModalClose}
                            />
                        </ButtonToolbar>

                        <br></br>
                        <h3 class="h3">EQUIPMENTS MANAGEMENT</h3>
                        <br />
                        ✦ Sport : <input type ="text" 
                      onChange={(event)=> {
                          this.setState({searchTerm2 : event.target.value})
                      }}
                      /> 
                 
                          { equipments && equipments.filter((val) => {
                           if (val && val.SPORTNAME.includes(this.state.searchTerm2)){
                             return val
                         }
                           else if(this.state.searchTerm2 == "") {
                             return 0
                           }
                            })
                      .map((val,key) =>{
                          return (
                                <Table>
                                <thead>
                                <tr>
                                    <th>EquipmentName</th>
                                    <th>SportName</th>
                                     <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr key={key}>
                                    
                                        <td>{val && val.EQUIPMENTNAME}</td>
                                        <td>{val && val.SPORTNAME}</td>
                                        <td>
                                            <ButtonToolbar>
                                                   <Button
                                                    className="mr-2"
                                                    onClick={() => this.deleteFac(val && val.EQUIPMENTID)}
                                                    variant="danger">Delete</Button>
                                            </ButtonToolbar>
                                        </td>
                                        </tr>
                                        </tbody>
                            </Table>
                        )
                          })
                   }
                        <br></br>
                        

                        <ButtonToolbar>
                            <Button
                                variant='primary'
                                onClick={() => this.setState({ addPModalShow: true })}
                            >Add Equipment
                            </Button>
                            <AddEquipmentModel
                                show={this.state.addPModalShow}
                                onHide={addPModalClose}
                            />

                        </ButtonToolbar>
                        <br />

                        <br></br>
                       
                        <h4 class="h5">@ABC sports Facility</h4>

                    </form>
                </form>
            </form>


        );
    }
}



ReactDOM.render(
    <FacilityModifier />,
    document.getElementById('root')
);




export default withRouter(FacilityModifier)