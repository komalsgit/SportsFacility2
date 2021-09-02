import React, { Component } from 'react'
//import ReactDOM from 'react-dom';
//import data from "./data.json";
//import './HomeApp.css';
//import './Login.css';

import { Row,Col,Table, Button, ButtonToolbar,Form } from 'react-bootstrap';
import { AddBookModal } from './AddBookModal';
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { Redirect } from 'react-router-dom';
import { withRouter } from "react-router-dom";


class Login2 extends Component {

	constructor(props) {
	  super(props);
    this.state={locs:[],books:[], addSModalShow: false, editSModalShow: false}
	  this.state = { searchTerm1:'',};
	  this.state = {value: 'ABCPune'};
      this.state = { redirect: null, };
//render() {
  
 // return(
  // Your Code goes here
 // )
//}

     // this.handleChange = this.handleChange.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
	}
   
 

 
	      
        handleSubmit(event) {
           // alert(event.target.EMAIL.value);
           // alert(event.target.USER_PWD.value)
    
            event.preventDefault();
           
           fetch ('https://localhost:44345/api/LoginManagement/',{
               method: 'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json' 
                },
                    body:JSON.stringify({
                   EMAIL:event.target.EMAIL.value,
                   USER_PWD:event.target.USER_PWD.value,
        
                  
    
               })
            })
           .then(res => res.json())
                .then((res)=>
                {
                   alert(res );
              //    this.setState({value: 1})
              if (
                  res == "Success"
              ){
                   this.setState({redirect: "/Home" });
              }else{
                this.setState({ redirect:"/Login2" })
              }
                  // this.setState({snackbaropen:true,snackbarmsg:res})
               },
                (error)=>{
                  // alert('Failed')
                   this.setState({ redirect:"/Login2" })
                  
                  // this.setState({snackbaropen:true,snackbarmsg:'failed'})
                }
                )
        }
       redirectToRegister(event){
          event.preventDefault();{
          this.setState({ redirect:"/Home" });
          }
    
       }
        
      
	 // };
  
 

	  render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }
      const {locs,books} = this.state;
      let addSModalClose = () => this.setState({ addSModalShow: false });
      let editSModalClose = () => this.setState({ editSModalShow: false });
	  function shoot() {
	  alert("Form Submitted!");
		  }	
     
		  return (
             
		     <div>
			  <form class="frm1" onSubmit={this.handleSubmit}>
	  
			<div  >
		<h1  class="wrapper">ABC Sports Facility</h1>
		
	
   </div>
		<br></br>
    <br></br>
		<h2 class="h2">Login Page</h2>
		<br></br>
    <Row class="row">
      <Col  xs={3} md={3}></Col>
      <Col xs={6} md={6} class="col">
        <Form.Group   className="loginText" controlid="EMAIL">
                     <Form.Label> Email Id</Form.Label>
                     <Form.Control
                     className="loginText"
                     type="email"
                     name="EMAIL"
                     id="EMAIL"
                     required
                     />
                     </Form.Group>
                     </Col>
                     </Row>
                     <Row >
                     <Col  xs={3} md={3}></Col>
                     <Col  xs={6} md={6}  class="col">
                     <Form.Group   className="loginText" controlid="USER_PWD">
                     <Form.Label> Password</Form.Label>
                     <Form.Control
                     type="password"
                     name="USER_PWD"
                     id="USER_PWD"
                     required
                     />
                     </Form.Group>
                     </Col>
                     </Row>
            <br></br>
           
    
                <Button type="submit">Submit</Button>
                <div className="registerMessage">
                <span>Dont have an account? </span>
                <span className="loginText" onClick={()=>this.setState({redirect:"/Registration"})}>Register</span> 
            </div>
               
               </form>
               </div>
              
             
               
	
		
	  
	  );
	}
}
	  
;
  
 // ReactDOM.render(
	//<Form />,
	//document.getElementById('root')
 // );
//export default Form

  

export default Login2