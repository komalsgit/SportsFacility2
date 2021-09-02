import React, {Component} from 'react';
import {Modal,Button,Row,Col,Form,} from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class EditRoleModal extends Component{
    constructor(props){
        super(props);
        this.state = {UserRoleId :"",roles:[],snackbaropen: false, snackbarmsg: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    snackbarClose = (event) =>{
        this.setState({snackbaropen:false});
     
      };
      componentDidMount(){
        fetch ('https://localhost:44345/api/UserRoleGet')
        .then(response => response.json())
        .then(data => {
          this.setState({roles:data})
        });
       }
      handleSubmit(event) {
        ///////	alert('submit: ' + this.state.value);
           // alert(this.state.value);
            event.preventDefault();
        	//alert(this.state.UserRoleName.value);
            
        
            fetch ('https://localhost:44345/api/UserRoleGet/Put',{
               method: 'PUT',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json' 
                },
                    body:JSON.stringify({
                   UserRoleId:this.state.UserRoleId,
                  // UserRoleName:this.state.UserRoleName.value,
                 // IsActive:1,
                   
    
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
                Edit Facility
               </Modal.Title>
             </Modal.Header>
             <Modal.Body>
            
             <Row>
                 <Col sm={6}>
                 <Form  onSubmit={this.handleSubmit}> 
                
                 <Form.Label>UserRole</Form.Label>
                    <Form.Control as="select" onChange={(ddl=>this.setState({UserRoleId:ddl.target.value}))} controlId="LocationDropdown" >
                      {
                        this.state.roles.map(location=>
                          <option  value={location.UserRoleId} >{location.UserRoleName}</option>
                          )
                      }
                      
                    </Form.Control> 
                
                     
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