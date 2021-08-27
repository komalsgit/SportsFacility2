import React, {Component} from 'react';
import { Modal,Button,Row,Col,Form,} from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

  export class AddFacModel extends Component{
   
    constructor(props){
        super(props);
        this.state = { LOCATIONID :"",locations:[],snackbaropen: false, snackbarmsg: ''};
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
        	alert(event.target.FACILITYNAME.value);
            
        
            fetch ('https://localhost:44345/api/Values/',{
               method: 'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json' 
                },
                    body:JSON.stringify({
                    ID:null,
                   // FACILITYID:event.target.FACILITYID.value,
                    FACILITYNAME:event.target.FACILITYNAME.value,
                    FACILITYID:null,
               // /////	FACILITYENABLED:event.target.FACILITYENABLED.value,
                    FACILITYENABLED:null,
                   // LOCATIONNAME:event.target.LOCATIONNAME.value,
                    LOCATIONID:this.state.LOCATIONID
                   // LOCATIONNAME:event.target.LOCATIONNAME.value
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
      
       
       // const[selectedValue,setSelectedValue] = useState(LocationDropdown);
       // const handleChange = e =>{
         // setSelectedValue(e.value);
      //  }

      //  handleInputChange(event) {
       //  }
        render() {
         // const[selectedValue,setSelectedValue] = useState(this.state.LOCATIONID);
         // const handleChange = e =>{
          //  setSelectedValue(e.value);
         // }
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
               Add Facility
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
           
            <Row>
                <Col sm={6}>
                <Form  onSubmit={this.handleSubmit}> 
                <Form.Group controlId="FACILITYNAME">
                    <Form.Label>Facility Name</Form.Label>
                    <Form.Control
                    type="text"
                    name="FACILITYNAME"
                    required
                    placeholder="FacilityName"

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
                    
                <Form.Group controlId="FACILITYENABLED">
                    <label>Facility Enabled :</label>
                    <br></br>
                    <input
                    type="Checkbox"
                    size="lg-1"
                    name="FACILITYENABLED"
                    
                   

                    />
                     </Form.Group>
          
                    <br></br>
                    <Form.Group controlId="FACILITYID">
                   
                    <Form.Control

                    type="hidden"
                    name="FACILITYID"
                    
                    placeholder="Facility Id"

                    />
                     </Form.Group>
                    
                   
               
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

