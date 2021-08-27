import React, {Component} from 'react';
import { Modal,Button,Row,Col,Form,} from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

  export class AddEquipmentModel extends Component{
   
    constructor(props){
        super(props);
        this.state = { SPORTSID :"",sportss:[],snackbaropen: false, snackbarmsg: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
      
        
       // this.state = { value: 'Facility is Added Successfully' };
       // this.state = {
          //  isAvailable: true,
          //  numberOfEquipments: 2,
           // FACILITYNAME:this,
            
        // }
       }
       componentDidMount(){
        fetch ('https://localhost:44345/api/AddSportsTotal')
        .then(response => response.json())
        .then(data => {
          this.setState({sportss:data})
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
        	alert(event.target.EQUIPMENTNAME.value);
            
        
            fetch ('https://localhost:44345/api/EquipmentSport/',{
               method: 'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json' 
                },
                    body:JSON.stringify({
                    ID:null,
                   // FACILITYID:event.target.FACILITYID.value,
                    EQUIPMENTNAME:event.target.EQUIPMENTNAME.value,
                    EQUIPMENTID:null,
               // /////	FACILITYENABLED:event.target.FACILITYENABLED.value,
                    ISACTIVE:1,
                   // LOCATIONNAME:event.target.LOCATIONNAME.value,
                    SPORTSID:this.state.SPORTSID
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
               Add Equipment
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
           
            <Row>
                <Col sm={6}>
                <Form  onSubmit={this.handleSubmit}> 
                <Form.Group controlId="EQUIPMENTNAME">
                    <Form.Label>Equipment Name</Form.Label>
                    <Form.Control
                    type="text"
                    name="EQUIPMENTNAME"
                    required
                    placeholder="EquipmentName"

                    />
                    </Form.Group>
                    <Form.Label>Sport</Form.Label>
                    <Form.Control as="select" onChange={(ddl=>this.setState({SPORTSID:ddl.target.value}))} controlId="SportsDropdown" >
                      {
                        this.state.sportss.map(sportss=>
                          <option  value={sportss.SPORTSID} >{sportss.SPORTNAME}</option>
                          )
                      }
                      
                    </Form.Control>
                    
                   
                    <br></br>
                    
                <Form.Group controlId="FACILITYENABLED">
                    <label>Equipment Enabled :</label>
                    <br></br>
                    <input
                    type="Checkbox"
                    size="lg-1"
                    name="FACILITYENABLED"
                    
                   

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

