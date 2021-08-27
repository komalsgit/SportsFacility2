import React, { Component } from 'react'
import ReactDOM from 'react-dom';

class Form extends Component {


	//class Reservation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isAvailable: true,
			numberOfEquipments: 2,
			sportName: this,
		};

		//this.handleInputChange = this.handleInputChange.bind(this);
		this.state = { value: 'Sport is Added Successfully' };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event) {
		this.setState({ value: event.target.value });
	};

	handleSubmit(event) {
		alert(this.state.value);
		event.preventDefault();
		//
	/*	fetch ('http://localhost:44345/api/Values',{
			method: 'POST',
			headers:{
				'Accept':'application/json',
				'Content-Type':'application/json'
			},
			body:JSON.stringify({
				//SportId:null,
				sportName:event.target.sportName.value
				//sportEnabled:event.target.sportEnabled.value

			})
		})
			.then(res => res.json())
			.then((result)=>
			{
				alert(result);
			},
			(error)=>{
				alert('Failed')
			}
			)
		//}) */
	};


	handleInputChange(event) {
		// const target = event.target;
		//const value = target.type === 'checkbox' ? target.checked : target.value;
		// const name = target.name;

		// this.setState({
		//[name]: value
		// });
	}



	render() {

		function shoot() {
			alert("Form Submitted!");
		}



		return (


			<form onSubmit={this.handleSubmit} class="frm1">


				<h1 class="wrapper">ABC Sports Facility</h1>
				<div class="tab">
					<button ><a href="UserManagement">User Management</a></button>
					<button><a href="Admin/FacilityModifier">Admin</a></button>
					<button><a href="Home">Home/Booking</a></button>
				</div>

				<h2 class="h2">Add Sport</h2>
				<br></br>
                <br></br>
				<table>
          <thead>
           
          </thead>
          <tbody>
			  <tr>
				  <th>Select Facility</th>
				  <td text-align="Center">ABCPune</td>
			  </tr>
            <tr>
              <th>Sport Name</th>
              <td><label class="lbl2">
					<input
                        name="sportName"
						type="text"
                    />
				</label>
    
		 </td>
     </tr>
     <tr>
     <th>Number Of Equipments</th>
     
              <td>	<label class="lbl2">
					<input
                        name="sportName"
						type="text"
                    />
				</label>
		  <br></br></td>
      </tr>
           
			<tr>
      <th>TimeSlots : </th>
              <td><label class="lbl2">
					
					<select value={this.state.value} onChange={this.handleChange}>
						<option value="cricket">8AM-9AM</option>
						<option value="tennis">9AM-10AM</option>
						<option value="football">10AM-11AM</option>
						<option value="baseball">11AM-12PM</option>
					</select>
				</label></td>
        </tr>
            <tr>
            <th name="sportEnabled">Sport Enabled : </th>
            <td><label class="lbl2">
					Is Enabled:
					<input
						name="isAvailable"
						type="checkbox"
						checked={this.state.isAvailable}
						onChange={this.handleInputChange} />
				</label></td>
            </tr>
               </tbody>
			 
        </table>
		
		<br></br>
	   <button onClick={shoot} >Submit</button>


			</form>




		);
	}
}


ReactDOM.render(
	<Form />,
	document.getElementById('root')
);




export default Form