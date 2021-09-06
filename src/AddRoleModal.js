import React, {Component} from 'react';
import { Modal,Button,Row,Col,Form,} from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import { Redirect } from 'react-router-dom';

  export class AddRoleModal extends Component{
   
    constructor(props){
        super(props);
        this.state = { LOCATIONID:"",locations:[],UserRoleId:"",roles:[],USERID :"",users:[],snackbaropen: false, snackbarmsg: '', redirect: null};
        this.handleSubmit = this.handleSubmit.bind(this);
       // this.state = { redirect: null };
        
      
       }
       componentDidMount(){
        fetch ('https://localhost:44345/api/Locationss')
        .then(response => response.json())
        .then(data => {
          this.setState({locations:data})
        });
     //   fetch ('https://localhost:44345/api/UserRoleGet')
       // .then(response => response.json())
       // .then(data => {
        //  this.setState({roles:data})
       // });
       }
      
         snackbarClose = (event) =>{
            this.setState({snackbaropen:false});
         // this.state = { value: 'Facility is Added Successfully' };
         };
         
    
         // this.handleChange = this.handleChange.bind(this);
         // this.handleSubmit = this.handleSubmit.bind(this);
       // };
      // handleChange(event) {
           // this.setState({value: event.target.value});
         // }
         
        
         handleSubmit(event) {
        
            event.preventDefault();
        //	alert(event.target.EMAIL.value);
          if (event.target.USER_PWD.value == event.target.USER_PWD1.value)
          {
        
            fetch ('https://localhost:44345/api/UserRoleGet/',{
               method: 'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json' 
                },
                    body:JSON.stringify({
                    USERID:null,
                    EMAIL:event.target.EMAIL.value,
                    USER_PWD:event.target.USER_PWD.value,
                    ISACTIVE:null,
                    LOCATIONID:this.state.LOCATIONID,
                    UserRoleId:1
                  
    
               })
            })
           .then(res => res.json())
                .then((res)=>
                { 
                  if (
                    res == "Success"
                ){
                     this.setState({redirect: "/Home" });
                }else if(res == "failure"){
                  event.preventDefault();
                  alert("failure")
                  //this.setState({ redirect:"/login2" })
                }
                  // alert(res );
                //  if (event.target.USER_PWD.value == event.target.USER_PWD1.value){
                  //  this.setState({ redirect:"/Home" })
                 // }
                //  else if (event.target.USER_PWD.value == event.target.USER_PWD1.value){
                   // this.setState({ redirect:"/login2" })
                 // }
                  this.setState({snackbaropen:true,snackbarmsg:res})
               },
                (error)=>{
                  // alert('Failed')
               //   this.setState({ redirect:"/login2" })
                   this.setState({snackbaropen:true,snackbarmsg:'failed'})
                }
                )
        }
      else  if (event.target.USER_PWD.value != event.target.USER_PWD1.value) {
          alert("Password is not matching")
          this.setState({ redirect:"/login2" })
        }
         }
        
       
      
        render() {
         if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
         }
        
        return(
            <div className="container" >
                <Snackbar
                anchorOrigin={{vertical:'top',horizontal:'top'}}
                open = {this.state.snackbaropen}
                autoHideDuration ={9000}
                onClose={this.snackbarClose}
                message = {<span id="message-id">{this.state.snackbarmsg}</span>}
                action={[
                    <IconButton
                    key="close"
                    arial-label="Close"
                    color="inherit"
                    onClick={this.snackbarClose}
                    >x</IconButton>
                ]}
                />
            <Modal
          {...this.props}
            size="lg"
           
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header >
              <Modal.Title id="contained-modal-title-vcenter">
              Register
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
           
            <Row>
                <Col sm={6}>
                <Form  onSubmit={this.handleSubmit}> 
                <Form.Group controlid="EMAIL">
                    <Form.Label>Email ID</Form.Label>
                    <Form.Control
                    type="email"
                    name="EMAIL"
                    required
                     />
                    </Form.Group>
                    <Form.Group controlid="USER_PWD">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type="password"
                    name="USER_PWD"
                    required
                     />
                    </Form.Group>
                    <Form.Group controlid="USER_PWD1">
                    <Form.Label> Confirm Password</Form.Label>
                    <Form.Control
                    type="password"
                    name="USER_PWD1"
                    required
                     />
                    </Form.Group>
                    <Form.Label>Location</Form.Label>
                    <Form.Control as="select" onChange={(ddl=>this.setState({LOCATIONID:ddl.target.value}))} controlId="LocationDropdown" >
                      {
                        this.state.locations.map(location=>
                          <option  value={location.LOCATIONID} >{location.LOCATIONNAME}</option>
                          )
                      }
                      
                    </Form.Control>
                   
          
               
                    
                   
               
               <br></br>
                <Form.Group>
                <Button type="submit">Submit!</Button>
                <Button  variant="danger"  onClick={this.props.onHide}>Cancel</Button>
                </Form.Group>
                </Form>
                </Col>
            </Row>
			 
       
            </Modal.Body>
            <Modal.Footer>
           
              <span  className="loginText" variant="danger"  onClick={this.props.onHide}>X</span>
            </Modal.Footer>
            </Modal>
            </div>

        );
    }
}

