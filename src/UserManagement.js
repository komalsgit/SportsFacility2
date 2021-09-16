import React, { Component } from "react";
//import "./TableApp.css";
import ReactDOM from 'react-dom';
import './FacilityOverview.css';
import { Table,Button,ButtonToolbar,Form} from 'react-bootstrap';
import { EditRoleModal } from './EditRoleModal';
import { AddRoleModal } from './AddRoleModal';

class UserManagement extends Component {

  constructor(props) {
    super(props);
    this.state={locs:[],roles:[], addSModalShow: false, editSModalShow: false}
	  this.state = { searchTerm1:'',};
   
   
 
    this.handleInputChange = this.handleInputChange.bind(this);
     this.state = {black: true};
   this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  changeColor(){
    this.setState({black: !this.state.black})
 }
 changeColor1(){
  this.setState({black: !this.state.black})
}
changeColor2(){
  this.setState({black: !this.state.black})
}
 // handleChange(event) {
 //   this.setState({ value: event.target.value });
 // }

 // handleSubmit(event) {
  //  alert(' Location is: ' + this.state.value);
   // event.preventDefault();
  //};
 
  componentDidMount() {
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
  refreshList() {

    fetch('https://localhost:44345/api/UserRoleGet')
        .then(response => response && response.json())
        .then(response => {
            this.setState({ roles: response && response });
        })
}
componentDidUpdate() {
  this.refreshList();
}
 
	       handleChange(event) {
			this.setState({value: event.target.value});
		    };
	
	  //handleSubmit(event) {
	//	alert('Location is: ' + this.state.value);
	//	event.preventDefault();
	 // };
    deleteBooking(spid) {
      if (window.confirm('Are you sure?')) {
          fetch('https://localhost:44345/api/UserRoleGet/' + spid, {
              method: 'DELETE',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              }
          })
      }
  }
  render() {
    const {locs,roles,userid,emid,locsid,pwd,roleid,roleenable,rolename} = this.state;
    let addModalClose =() => this.setState({addModalShow : false});
    let editModalClose =() => this.setState({editModalShow : false});
    let btn_class = this.state.black ? "blackButton" : "whiteButton";


    return (
      <form class="frm1">
        <div>
          <h1 class="wrapper"> ⚽⚾  ABC Sports Facility  🎾🏀</h1>

          <div class="tab">

          <div  className="container" ref={this.container}>
            <button  className={btn_class}
                         onClick={this.changeColor.bind(this)}><a href="UserManagement"></a>💻UserManagement</button>
            <button><a href ="admin/FacilityModifier">👲Admin</a></button>
            <button><a href="Home/Booking">⛪Home/Booking</a></button>
          </div>
          <br></br>
          <div  class="tap">
    <button> <a href="/logout" >Logout</a></button>
        </div> 
          </div>
          <br></br>
      
          
          <br></br>
         
            <h2 class="h2"> ✦ USER MANAGEMENT ✦ </h2>

         
            </div>
            <br></br>
      

       
            ✦ Location  : <input type ="text" 
                            onChange={(event)=> {
                                this.setState({searchTerm1 : event.target.value})
                            }}
                            /> 
                            <br></br>
                                 { roles && roles.filter((val) => {
                          if (val && val.LOCATIONNAME.toLowerCase().includes(this.state.searchTerm1)){
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
                                   
                                    <th>Email</th>
                                    <th>UserRole</th>
                                    <th>Location</th>
                                   
                                   
                                </tr>
                                </thead>  
                                   
                               
                                <tbody>
                                <tr key={key}>
                               
                                <td>{val && val.EMAIL}</td>
                                <td>{val && val.UserRoleName}</td>
                                <td>{val && val.LOCATIONNAME}</td>
                                <td>
                                        <ButtonToolbar>
                                        <Button 
                                            className="mr-2" variant="info"
                                            onClick={()=>this.setState({editModalShow:true, userid:val && val.USERID,emid:val && val.EMAIL, pwd:val && val.USER_PWD,roleenable: val && val.ISACTIVE,roleid : val && val.UserRoleId, locsid: val && val.LOCATIONID})}
                                            > Edit </Button>
                                            <Button
                                                    className="mr-2"
                                                    onClick={() => this.deleteBooking(val && val.USERID)}
                                                    variant="danger">Delete</Button>
                                                     <EditRoleModal
                                                show={this.state.editModalShow}
                                                onHide={editModalClose}
                                                userid={userid}
                                                emid={emid}
                                                pwd={pwd}
                                                roleenable={roleenable}
                                                roleid={roleid}
                                                locsid={locsid}
                                               
                                               
                                            />
                                               
                                            </ButtonToolbar>
                                        </td>
                                </tr>
                             </tbody>
                         
                             </Table>
          )} )}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h4 class="h5">@ABC sports Facility</h4>

      </form>
    );
  }
}
//}
//}
//}
ReactDOM.render(
  <UserManagement />,
  document.getElementById('root')
);




export default UserManagement
