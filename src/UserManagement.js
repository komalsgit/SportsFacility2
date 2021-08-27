//import React ,{Component ,useState } from "react";
import React, { Component } from "react";
//import { nanoid } from "nanoid";
import "./TableApp.css";
//import data from "./mock-data.json";
//import ReadOnlyRow from "./components/ReadOnlyRow";
//import EditableRow from "./components/EditableRow";
class UserManagement extends Component {
  constructor(props) {
    super(props);
   // this.state = {
    //  isAvailable: true,
    //  numberOfEquipments: 2
   // };
    this.state = { value :"Kolkata"};
   // this.state = { value: 'ABCPune' };
   // this.state = { value: '9AM-10AM' };

   // this.handleInputChange = this.handleInputChange.bind(this);
    // this.state = {value: 'Pune'};
   // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
 // handleChange(event) {
 //   this.setState({ value: event.target.value });
 // }

  handleSubmit(event) {
    alert(' Location is: ' + this.state.value);
    event.preventDefault();
  };
  handleInputChange(event) {
   // const target = event.target;
   // const value = target.type === 'checkbox' ? target.checked : target.value;
   // const name = target.name;

   // this.setState({
    //  [name]: value
   // });
  
  
  }
  render() {
      function shoot() {
      alert("Form Submitted!");
    }


    return (
      <form onSubmit={this.handleSubmit} class="frm1">
        <div>
          <h1 class="wrapper">ABC Sports Facility</h1>
          <div class="tab">
            <button ><a href="UserManagement">User Management</a></button>
            <button><a href ="admin/FacilityModifier">Admin</a></button>
            <button><a href="Home/Booking">Home/Booking</a></button>
          </div>
          <br></br>
          <label class="lbl1">
            Location:
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="Pune">Pune</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Chennai</option>
              <option value="Kolkata">Delhi</option>
            </select>
          </label>
          <br></br>
          <div >
            <h2 class="h2">User Roles</h2>
            <form>

              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>IsAdmin</th>
                  </tr>
                </thead>
                <tbody>

                  <tr>
                    <td>Komal Patole</td>
                    <td > <label>
                      <input
                        name="isGoing"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange}
                      />
                    </label></td>
                  </tr>
                  <tr>
                    <td>Utsa Rabbani</td>
                    <td > <label>
                      <input
                        name="isGoing"
                        type="checkbox"
                      />
                    </label></td>
                  </tr><tr>
                    <td>Santhosh Kumar Sangameswaran</td>
                    <td > <label>
                      <input
                        name="isGoing"
                        type="checkbox"
                      />
                    </label></td>
                  </tr>
                  <tr>
                    <td>Aabaavanan Deenadayalan</td>
                    <td > <label>
                      <input
                        name="isGoing"
                        type="checkbox"
                      />
                    </label></td></tr>


                </tbody>
              </table>
              <br></br>


            </form>

          </div>

        </div>

        <button type="submit" width="10%" class="btn1" onClick={shoot}>Save</button>
        <button type="submit" width="10%" class="btn1">Cancel</button>

      </form>
    );
  }
}
//}

;


export default UserManagement
