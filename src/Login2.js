import React, { Component } from 'react'
//import ReactDOM from 'react-dom';
//import data from "./data.json";
//import './HomeApp.css';
//import './Login.css';
//import {Button,ButtonToolbar,Form} from 'react-bootstrap';
import ProtectedRoute from './ProtectedRoute';
import { AddRoleModal } from './AddRoleModal';
import  Home  from './Home';
import './App.css';
import App from './App';
import { Row,Col,Table, Button, ButtonToolbar,Form } from 'react-bootstrap';
import { AddBookModal } from './AddBookModal';
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { Redirect } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import{  BrowserRouter as Router,Link,Route, Switch } from "react-router-dom";


class Login2 extends Component {

	constructor(props) {
	  super(props);
   
    this.state={locs:[],books:[],UserRoleId :"",equips:[], addSModalShow: false, editSModalShow: false}
	  this.state = { searchTerm1:'',};
    this.state = { redirect: null,isAuth:false };
	//  this.state = {value: 'ABCPune'};
    
     // this.state = {
       // isAuth:true
     // };
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
         //  this.setState({isAuth:true})
            event.preventDefault();
            fetch(`https://localhost:44345/api/getRole?EMAIL=${event.target.EMAIL.value}`)
            .then(response => response.json())
          
           .then(data => {
               this.setState({ equips: data })
             // alert(JSON.stringify(data))
            //  localStorage.setItem('Idm',JSON.stringify(data))
              var op = data.map(function(item) {
                var keys = Object.keys(item);
                var arr = [];
                keys.forEach(function(key) {
                  arr.push(item[key]);
                });
                return arr;
              });
             // alert(op);
              localStorage.setItem('val',op)
              
              // .then(res => res.json())
              /////////// .then((response)=>
             //////////////////  {
              //////////////////////////  localStorage.setItem('Idm',JSON.stringify(response))
            //localStorage.setItem('Idm',response.value)
             ///////////////////////  }
            }
           );
           // this.setState({ isAuth : true })
           
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
                 localStorage.setItem('Email', event.target.EMAIL.value)
                  localStorage.setItem('Login2',res)
                  // alert("Success");
              //    this.setState({value: 1})
              if (
                  res == "Success"
              ){
              
                // this.setState({ isAuth : true })
               //  alert(this.state.isAuth)
           
                   this.setState({ redirect: "/home" });
              }else{
               // this.setState({ redirect:"/login2" })
               // this.setState({ isAuth : false });
              }
                  // this.setState({snackbaropen:true,snackbarmsg:res})
               },
                (error)=>{
                  // alert('Failed')
                   this.setState({ redirect:"/login2" })
                  
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
         
          const { isAuth } = this.state;
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
		<h1  class="wrapper"> ⚽⚾  ABC Sports Facility  🎾🏀</h1>
		
	
   </div>
		<br></br>
    <br></br>
		<h2 class="h2">  ✦ Login Page  ✦</h2>
		<br></br>
    <Row class="row">
      <Col  xs={3} md={3}></Col>
      <Col xs={6} md={6} class="col">
        <Form.Group   className="loginText" controlid="EMAIL">
                     <Form.Label>✦  Email Id</Form.Label>
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
                     <Form.Label> ✦ Password</Form.Label>
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
            <Row>
              <Col  xs={10} md={3}></Col>
                     <Col  xs={5} md={5}  class="col">
          

         
            <div className="App">
              <Button type="submit"  onClick={() => this.setState({ isAuth: true})} >Submit</Button>
              <div>
            
              </div>
                 </div>
               
             
             
             
            
             
             
             </Col>
              </Row>
                <div className="registerMessage">
                <span>Dont have an account? </span>
              
                                   <span className="loginText"
                                    variant ='primary'
                                   onClick={()=> this.setState({addSModalShow: true})}
                                   >Register
                                   </span>
                                   <AddRoleModal
                                       show={this.state.addSModalShow}
                                       onHide={addSModalClose}
                                   />

                              
            </div>
            <br></br>
            <br></br>
            <h4 class="h5">@ABC sports Facility</h4>
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