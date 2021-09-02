import React, {Component} from 'react';
import { Modal,Button,Row,Col,Form,} from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

  export class AddRoleModal extends Component{
   
    constructor(props){
        super(props);
        this.state = { LOCATIONID:"",locations:[],UserRoleId:"",roles:[],USERID :"",users:[],snackbaropen: false, snackbarmsg: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
      
        
       // this.state = { value: 'Facility is Added Successfully' };
       // this.state = {
          //  isAvailable: true,
          //  numberOfEquipments: 2,
           // FACILITYNAME:this,
            
        // }
       }
       componentDidMount(){
        fetch ('https://localhost:44345/api/Locationss')
        .then(response => response.json())
        .then(data => {
          this.setState({locations:data})
        });
        fetch ('https://localhost:44345/api/UserRoleGet')
        .then(response => response.json())
        .then(data => {
          this.setState({roles:data})
        });
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
        ///////	alert('submit: ' + this.state.value);
           // alert(this.state.value);
            event.preventDefault();
        	alert(event.target.EMAIL.value);
            
        
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
                    UserRoleId:this.state.UserRoleId
                  
    
               })
            })
           .then(res => res.json())
                .then((res)=>
                {
                  // alert(res );
                   this.setState({snackbaropen:true,snackbarmsg:res})
               },
                (error)=>{
                  // alert('Failed')
                   this.setState({snackbaropen:true,snackbarmsg:'failed'})
                }
                )
        }
      
       
      
        render() {
        
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
               Add User
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
                    <br></br>
                   
                <Form.Group controlid="USER_PWD">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type="password"
                    name="USER_PWD"
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
                    <Form.Label>User Role</Form.Label>
                    <Form.Control as="select" onChange={(ddl=>this.setState({UserRoleId:ddl.target.value}))} controlId="LocationDropdown" >
                      {
                        this.state.roles.map(location=>
                          <option  value={location.UserRoleId} >{location.UserRoleName}</option>
                          )
                      }
                      
                    </Form.Control>
                    
                   
                    <br></br>
                    
               
          
               
                    
                   
               
               <br></br>
                <Form.Group>
                <Button type="submit">Submit!</Button>
                </Form.Group>
                </Form>
                </Col>
            </Row>
			 
       
            </Modal.Body>
            <Modal.Footer>
           
              <Button  variant="danger"  onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
            </Modal>
            </div>

        );
    }
}

