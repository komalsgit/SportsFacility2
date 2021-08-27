import React, {Component} from 'react';
import {Modal,Button,Row,Col,Form,} from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class EditTimeSlot extends Component{
    constructor(props){
        super(props);
        this.state = {snackbaropen: false, snackbarmsg: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    snackbarClose = (event) =>{
        this.setState({snackbaropen:false});
     
      };
      handleSubmit(event) {
        ///////	alert('submit: ' + this.state.value);
           // alert(this.state.value);
            event.preventDefault();
        	alert(event.target.TIMESLOT.value);
            
        
            fetch ('https://localhost:44345/api/TimeSlots/Putslot',{
               method: 'PUT',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json' 
                },
                    body:JSON.stringify({
                    ID:null,
                    TIMESLOTID:event.target.TIMESLOTID.value,
                    TIMESLOT:event.target.TIMESLOT.value,
               // /////	FACILITYENABLED:event.target.FACILITYENABLED.value,
                    ISACTIVE:null,
                    SPORTSID:event.target.SPORTSID.value,
                    //////////sportEnabled:event.target.sportEnabled.value
    
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
            // function shoot() {
               //  alert("Form Submitted!");
    //  }
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
                Edit TimeSlot
               </Modal.Title>
             </Modal.Header>
             <Modal.Body>
            
             <Row>
                 <Col sm={6}>
                 <Form  onSubmit={this.handleSubmit}> 
                 <Form.Group controlId="FACILITYNAME">
                     <Form.Label>TIMESLOT</Form.Label>
                     <Form.Control
                     type="text"
                     name="TIMESLOT"
                     required
                     defaultValue = {this.props.slotname}
                     placeholder=" Edit Timeslot"
 
                     />
                     </Form.Group>
                      <Form.Group controlId="TIMESLOTID">
                     <Form.Label></Form.Label>
                     <Form.Control
                     type="hidden"
                     name="TIMESLOTID"
                     required
                     disabled
                     defaultValue = {this.props.slotid}
                     placeholder="TIMESLOTID"
 
                     />
                 </Form.Group>
                 <Form.Group controlId="ISACTIVE">
                     <label>ISACTIVE : </label>
                     <input

                     type="checkbox"
                     
                     name="ISACTIVE"
                     defaultValue = {this.props.slotenable}
                    
 
                     />
                      </Form.Group>
                      <Form.Group controlId="SPORTSID">
                     <Form.Label></Form.Label>
                     <Form.Control
                     type="hidden"
                     name="SPORTSID"
                     required
                     disabled
                     defaultValue = {this.props.sportid}
                     placeholder="Sports Id"
 
                     />
                     <br></br>
                
                 </Form.Group>
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