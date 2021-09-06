import React, {Component} from 'react';
import {Modal,Button,Row,Col,Form,} from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class EditFacModel extends Component{
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
        	alert(event.target.FACILITYNAME.value + " is Edited");
            
        
            fetch ('https://localhost:44345/api/Values/Put',{
               method: 'PUT',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json' 
                },
                    body:JSON.stringify({
                    ID:null,
                    FACILITYID:event.target.FACILITYID.value,
                    FACILITYNAME:event.target.FACILITYNAME.value,
               // /////	FACILITYENABLED:event.target.FACILITYENABLED.value,
                    FACILITYENABLED:1,
                    LOCATIONID:event.target.LOCATIONID.value
                    //////////sportEnabled:event.target.sportEnabled.value
    
               })
            })
           .then(res => res.json())
                .then((res)=>
                {
                  // alert(res );
                  // this.setState({snackbaropen:true,snackbarmsg:res})
               },
                (error)=>{
                  // alert('Failed')
                  // this.setState({snackbaropen:true,snackbarmsg:'failed'})
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
                Edit Facility
               </Modal.Title>
             </Modal.Header>
             <Modal.Body>
            
             <Row>
                 <Col sm={6}>
                 <Form  onSubmit={this.handleSubmit}> 
                 <Form.Group controlid="FACILITYNAME">
                     <Form.Label>FACILITYNAME</Form.Label>
                     <Form.Control
                     type="text"
                     name="FACILITYNAME"
                     required
                     defaultValue = {this.props.facname}
                     placeholder="FacilityName"
 
                     />
                     </Form.Group>
                      <Form.Group controlId="FACILITYID">
                     <Form.Label></Form.Label>
                     <Form.Control
                     type="hidden"
                     name="FACILITYID"
                     required
                     disabled
                     defaultValue = {this.props.facid}
                     placeholder="FacilityId"
 
                     />
                 </Form.Group>
                 <Form.Group controlId="FACILITYENABLED">
                     <label>FACILITYENABLED : </label>
                     <input

                     type="checkbox"
                     
                     name="FACILITYENABLED"
                     defaultValue = {this.props.facenable}
                    
 
                     />
                      </Form.Group>
                      <Form.Group controlId="LOCATIONID">
                     <Form.Label></Form.Label>
                     <Form.Control
                     type="hidden"
                     name="LOCATIONID"
                     required
                     disabled
                     defaultValue = {this.props.locid}
                     placeholder="LocationId"
 
                     />
                     <br></br>
                
                 </Form.Group>
                 <Form.Group>
                 <Button type="submit">Submit!</Button>
                 <Button variant="danger"  onClick={this.props.onHide}>Cancel</Button>
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