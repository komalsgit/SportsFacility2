/*import React, {Component} from 'react';
import {Modal,Button,Row,Col,Form,} from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class EditStatusModel extends Component{
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
            alert("Role is Edited !!")
         //   alert(event.target.USERID.value)
        //	alert(event.target.UserRoleId.value);
            
        
            fetch ('https://localhost:44345/api/Sports/Put',{
               method: 'PUT',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json' 
                },
                    body:JSON.stringify({
                      BOOKINGSID:event.target.BOOKINGSID.value,
                      TIMESLOTID: event.target.BOOKINGSID.value,
                      LOCATIONID:event.target.LOCATIONID.value ,
                        SPORTSID:event.target.SPORTSID.value,
                   EVENTDATE:event.target.EVENTDATE.value,
                   CREATEDDATE:event.target. CREATEDDATE.value,
                   BOOKINGSTATUSID:event.target.BOOKINGSTATUSID.value,
                      FACILITYID:event.target. FACILITYID.value,
                      USERID:event.target.USERID.value,
                      EQUIPMENTID:event.target.EQUIPMENTID.value,
                  // UserRoleId:event.target.UserRoleId.value,
                  
                  // UserRoleName:this.state.UserRoleName.value,
                 
                 
                   
    
               })
            })
           .then(res => res.json())
                .then((res)=>
                {
                  // alert(res );
                 //  this.setState({snackbaropen:true,snackbarmsg:res})
               },
                (error)=>{
                  // alert('Failed')
                  // this.setState({snackbaropen:true,snackbarmsg:'failed'})
                }
                )
        }
        componentDidMount(){
          fetch ('https://localhost:44345/api/BookingStatus')
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
                 <Form.Group controlId=" BOOKINGSID">
                     <Form.Control
                     type="hidden"
                     name=" BOOKINGSID"
                     required
                     disabled
                     defaultValue = {this.props.bookid}
                        />
                 </Form.Group>
               
                 <Form.Group controlId="TIMESLOTID">
                     <Form.Control
                     type="hidden"
                     name="TIMESLOTID"
                     required
                     disabled
                     defaultValue = {this.props.timeslotid}
                        />
                 </Form.Group>
                 <Form.Group controlId="LOCATIONID">
                     <Form.Control
                     type="hidden"
                     name="LOCATIONID"
                     required
                     disabled
                     defaultValue = {this.props.locationid}
                        />
                 </Form.Group>
                 <Form.Group controlId="SPORTSID">
                     <Form.Control
                     type="hidden"
                     name="SPORTSID"
                     required
                     disabled
                     defaultValue = {this.props.sportsid}
                        />
                 </Form.Group>
                 <Form.Group controlId="FACILITYID">
                     <Form.Control
                     type="hidden"
                     name="FACILITYID"
                     required
                     disabled
                     defaultValue = {this.props.facilityid}
                        />
                 </Form.Group>
                 <Form.Group controlId="USERID">
                     <Form.Control
                     type="hidden"
                     name="USERID"
                     required
                     disabled
                     defaultValue = {this.props.usersid}
                        />
                 </Form.Group>
                 <Form.Group controlId="EQUIPMENTID">
                     <Form.Control
                     type="hidden"
                     name="EQUIPMENTID"
                     required
                     disabled
                     defaultValue = {this.props.equipmentid}
                        />
                 </Form.Group>
                 <Form.Group controlId="EVENTDATE">
                     <Form.Control
                     type="hidden"
                     name="EVENTDATE"
                     required
                     disabled
                     defaultValue = {this.props.edate}
                        />
                 </Form.Group>
                 <Form.Group controlId="CREATEDDATE">
                     <Form.Control
                     type="hidden"
                     name="CREATEDDATE"
                     required
                     disabled
                     defaultValue = {this.props.cdate}
                        />
                 </Form.Group>
               
                 <Form.Label>BookingStatus</Form.Label>
                    <Form.Control  name="BookingStatusid"as="select" onChange={(ddl => this.setState({BOOKINGSTATUSID:ddl.target.value}))}  
                     defaultValue = {this.props.roleid} controlId="RoleDropdown" >
                      {
                        this.state.roles.map(location=>
                          <option  value={location.BOOKINGSTATUSID} >{location.BOOKINGSTATUS}</option>
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
}*/