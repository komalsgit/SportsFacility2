import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import './AddFacility.css'
class AddFacility extends Component {
	

//class Reservation extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
		isAvailable: true,
		numberOfEquipments: 2,
		FACILITYNAME:this,
		
	  };
	  this.state = { value: 'Facility is Added Successfully' };
  
	 // this.handleInputChange = this.handleInputChange.bind(this);
	 // this.state = {value: 'football'};

	  this.handleChange = this.handleChange.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event) {
		this.setState({value: event.target.value});
	  }
	
	  handleSubmit(event) {
	///////	alert('submit: ' + this.state.value);
		alert(this.state.value);
		event.preventDefault();
	//////	alert(event.target.FACILITYENABLED.value);
		
	
		fetch ('https://localhost:44345/api/Values/Post',{
			method: 'POST',
			headers:{
				'Accept':'application/json',
				'Content-Type':'application/json' 
			},
			
			
			body:JSON.stringify({
				ID:null,
				FACILITYID:event.target.FACILITYID.value,
				FACILITYNAME:event.target.FACILITYNAME.value,
			////	FACILITYENABLED:event.target.FACILITYENABLED.value,
			    FACILITYENABLED:null,
				LOCATIONID:event.target.LOCATIONID.value
				//////////sportEnabled:event.target.sportEnabled.value

			})
		})
		.then(res => res.json())
			.then((res)=>
			{
				alert(res );
			},
			(error)=>{
				alert('Failed')
				//.catch(error => {
					//throw error;
			}
			)
		//})
	};
	 ////};

	handleInputChange(event) {
	 // const target = event.target;
	 // const value = target.type === 'checkbox' ? target.checked : target.value;
	 // const name = target.name;
  
	 // this.setState({
		//[name]: value
	 // });
	  
	  
	 // const myelement = (
		//<button onClick={shoot}>Submit!</button>
	 // );
	}
  
	render() {
		function shoot() {
			alert("Form Submitted!");
		  }
			
		
		
		//function shoot() {
		//	alert("Form Submitted!");
		 // }	
		
			
		
	  return (
		
			  
		  	<form    onSubmit={this.handleSubmit} class="frm1">
				 
			
		<h1 class="wrapper">ABC Sports Facility</h1>
		
	   <h2 class="h2">Add Facility</h2>
	   <br></br>
		 
			  <table>
          <thead>
           
          </thead>
          <tbody>
			  <tr>
				  <th>FACILITYNAME</th>
				  <td> <label class="lbl2">
			<input
			  name="FACILITYNAME"
			  type="text"
			  />
		  </label>
		  <br></br></td>
			  </tr>
			  <tr>
			  <th>FACILITYID</th>
				  <td> <label class="lbl2">
			<input
			  name="FACILITYID"
			  type="number"
			  />
		  </label>
		  <br></br></td>
			  </tr>
			  <tr>

			  <th>FACILITYENABLED</th>
				  <td> <label class="lbl2">
			<input
			  name="FACILITYENABLED"
			  type="Radio"
			  />
		  </label>
		  <br></br></td>
			  </tr>

            <tr>
              <th>LOCATIONID </th>
              <td> <label class="lbl2">
		
			<input
			   name="LOCATIONID"
			  type="number"
			 
			  />
		  </label>
		  <br></br>
    
		 </td>
     </tr>
     <tr>
     <th>Sports Available</th>
     
              <td> <label class="lbl2">
         
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="cricket">Cricket</option>
            <option value="tennis">Tennis</option>
            <option value="football">Football</option>
            <option value="baseball">Baseball</option>
          </select>
        </label></td>
      </tr>
            <tr>
            <th>Bookings Enabled : </th>
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
		
		
	  
		
		<button onClick={shoot} >Submit!</button>
	  
		
      </form>
		
		
		
	  
	  );
	}
  }

  
  ReactDOM.render(
	<AddFacility />,
	document.getElementById('root')
  );
  

  

export default AddFacility