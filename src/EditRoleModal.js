import React, {Component} from 'react';
import {Modal,Button,Row,Col,Form,} from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class EditRoleModal extends Component{
    constructor(props){
        super(props);
        this.state = {UserRoleId:"",roles:[],snackbaropen: false, snackbarmsg: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    snackbarClose = (event) =>{
        this.setState({snackbaropen:false});
     
      };
     
      handleSubmit(event) {
            event.preventDefault();
         //   alert(event.target.USERID.value)
        //	alert(event.target.UserRoleId.value);
            
        
            fetch ('https://localhost:44345/api/UserRoleGet/Put',{
               method: 'PUT',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json' 
                },
                    body:JSON.stringify({
                      USERID:event.target.USERID.value,
                      EMAIL:event.target.EMAIL.value,
                      USER_PWD:event.target.USER_PWD.value,
                      ISACTIVE:event.target.ISACTIVE.value,
                   UserRoleId:event.target.UserRoleId.value,
                   LOCATIONID:event.target.LOCATIONID.value 
                  // UserRoleName:this.state.UserRoleName.value,
                 
                 
                   
    
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
        componentDidMount(){
          fetch ('https://localhost:44345/api/UserRole')
          .then(response => response.json())
          .then(data => {
            this.setState({roles:data})
          });
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
                 <Form.Group controlId="USERID">
                     <Form.Control
                     type="hidden"
                     name="USERID"
                     required
                     disabled
                     defaultValue = {this.props.userid}
                        />
                 </Form.Group>
                 <Form.Group controlId="EMAIL">
                     <Form.Control
                     type="hidden"
                     name="EMAIL"
                     required
                     disabled
                     defaultValue = {this.props.emid}
                     />
                 </Form.Group>
                 <Form.Label>UserRole</Form.Label>
                    <Form.Control  name="UserRoleId"as="select" onChange={(ddl => this.setState({UserRoleId:ddl.target.value}))}  
                     defaultValue = {this.props.roleid} controlId="RoleDropdown" >
                      {
                        this.state.roles.map(location=>
                          <option  value={location.UserRoleId} >{location.UserRoleName}</option>
                          )
                      }
                      
                    </Form.Control> 
                 <Form.Group controlId="USER_PWD">
                     <Form.Control
                     type="hidden"
                     name="USER_PWD"
                     required
                     disabled
                     defaultValue = {this.props.pwd}
                     />
                 </Form.Group>
                 <Form.Group controlId="LOCATIONID">
                     <Form.Control
                     type="hidden"
                     name="LOCATIONID"
                     required
                     disabled
                     defaultValue = {this.props.locsid}
                     />
                 </Form.Group>
                 <Form.Group controlId="ISACTIVE">
                     <input
                     type="hidden"
                     name="ISACTIVE"
                     disabled
                     defaultValue = {this.props.roleenable}
                    
 
                     />
                      </Form.Group>
                      <br></br>

                 <Form.Group>
                 <Button type="submit">Submit</Button>
                 <Button  variant="danger"  onClick={this.props.onHide}>Cancel</Button>
                 </Form.Group>
                 </Form>
                 </Col>
             </Row>
              
        
             </Modal.Body>
             <Modal.Footer>
            
               <span   color="blue"variant="danger"  onClick={this.props.onHide}>X</span>
             </Modal.Footer>
             </Modal>
             </div>
 
         );
     }
}