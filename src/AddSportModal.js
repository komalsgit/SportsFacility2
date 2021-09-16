import React, { Component } from 'react';
//import Select from 'react-select';
import { Modal, Button, Row, Col, Form, } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
export class AddSportModal extends Component {

  constructor(props) {
    super(props);
    this.state = { snackbaropen: false, snackbarmsg: '' };
    this.state = {
      SPORTSID: "", sports: [], EQUIPMENTID: "", equips: [], TIMESLOTID: "", slots: [], LOCATIONID: "",
      locations: [], FACILITYID: "", facis: [],facies:[], BOOKINGID: "", books: [], sportse: [], snackbaropen: false, snackbarmsg: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    fetch('https://localhost:44345/api/EquipmentsforGet/GetEquipmentsList')
      .then(response => response.json())
      .then(data => {
        this.setState({ equips: data })
       fetch ('https://localhost:44345/api/AddSportsTotal')
       .then(response => response.json())
       .then(data => {
        this.setState({sports:data})
        fetch('https://localhost:44345/api/TimeSlots/GetTimeslotsList')
          .then(response => response.json())
          .then(data => {
            this.setState({ slots: data })
            fetch('https://localhost:44345/api/Locationss')
              .then(response => response.json())
              .then(data => {
                this.setState({ locations: data })
                fetch('https://localhost:44345/api/FacilityDD')
                  .then(response => response.json())
                  .then(data => {
                    this.setState({ facis: data })
                    fetch('https://localhost:44345/api/Bookings')
                      .then(response => response.json())
                      .then(data => {
                        this.setState({ books: data })
                        // fetch ('https://localhost:44345/api/SportfromFacility/'+ this.state.FACILITYID)
                        //   alert(this.state.FACILITYID);
                        //  const p = this.state.FACILITYID;

                        //const p=queryString.parse(this.state.FACILITYID)
                        //  fetch (`https://localhost:44345/api/SportfromFacility?FACILITYID=${p}`)
                        //  .then(response => {

                        //  this.setState({sports:response.data})
                        // })
                        // .then(response => response.json())
                        // .then(data => {
                        // this.setState({sports:data})
                        // console.log(p)
                         }); 

                      })
                  });
              });
          });
      });
  }
  snackbarClose = (event) => {
    event.preventDefault();
    this.setState({ snackbaropen: false });
  };
  handleSubmit(event) {
    event.preventDefault();
    alert("sport is Added !!")
   // alert(this.state.LOCATIONID);
    //alert(this.state.FACILITYID);
   // alert(this.state.SPORTSID);
   // alert(this.state.EQUIPMENTID);
   // alert(this.state.TIMESLOTID);
   // alert(this.state.BOOKINGID);
    fetch('https://localhost:44345/api/AddSportsTotal/PostSport', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        SPORTID: null,
        ISACTIVE: null,
        SPORTSID: this.state.SPORTSID,
        EQUIPMENTID: this.state.EQUIPMENTID,
       // BOOKINGID: this.state.BOOKINGID,
       BOOKINGID: 4,
        LOCATIONID: this.state.LOCATIONID,
        TIMESLOTID: this.state.TIMESLOTID,
        FACILITYID:this.state.FACILITYID
      })
    })
      .then(res => res.json())
      .then((res) => {
       // alert(res);
        // this.setState({snackbaropen:true,snackbarmsg:res})
      },
        (error) => {
        //  alert('Failed')
          // this.setState({snackbaropen:true,snackbarmsg:'failed'})
        }
      )
  }
  handleChange = (e) => {
    let target = e.target
    let name = target.name
    let value = Array.from(target.selectedOptions, option => option.value);
    this.setState({
      [name]: value
    });
  }
  //const p= this.state.FACILITYID;
  //handleAlternate(event) {
   // event.preventDefault();
   // fetch(`https://localhost:44345/api/SportfromFacility?FACILITYID=${this.state.FACILITYID}`)
     // .then(response => response.json())
     // .then(data => {
      //  this.setState({ sports: data })
     // });
 // }
  render() {
    return (
      <div className="container" >
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'top' }}
          open={this.state.snackbaropen}
          autoHideDuration={9000}
          onClose={this.snackbarClose}
          message={<span id="message-id">{this.state.snackbarmsg}</span>}
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
          <Modal.Header  >
            <Modal.Title id="contained-modal-title-vcenter">
              Add Sport
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="SPORTNAME">
                    <br></br>
                    <Form.Label>Location</Form.Label>
                    <Form.Control as="select" onChange={(ddl => this.setState({ LOCATIONID: ddl.target.value }))} controlId="LocationDropdown" >
                      {
                        this.state.locations.map(location =>
                          <option value={location.LOCATIONID} >{location.LOCATIONNAME}</option>
                        )
                      }

                    </Form.Control>
                    <Form.Label>Facility</Form.Label>
                    <Form.Control as="select" onChange={(ddl => this.setState({ FACILITYID: ddl.target.value }))} controlId="FacilityDropdown" >
                      {
                        this.state.facis.map(faci =>
                          <option value={faci.FACILITYID} >{faci.FACILITYNAME}</option>

                        )

                      }
                    </Form.Control>
                    <Form.Label>Sport</Form.Label>
                    <Form.Control as="select" onChange={(ddl => this.setState({ SPORTSID: ddl.target.value }))} controlId="SporteDropdown" >
                      {
                        this.state.sports.map(sport =>
                          <option value={sport.SPORTSID} >{sport.SPORTNAME}</option>
                        )
                      }

                    </Form.Control>
                  </Form.Group>
                  <br></br>
                  <Form.Label>Equipments</Form.Label>
                  <Form.Control as="select" onChange={(ddl => this.setState({ EQUIPMENTID: ddl.target.value }))} controlId="EquipmentDropdown" >
                    {
                      this.state.equips.map(eqs =>
                        <option value={eqs.EQUIPMENTID} >{eqs.EQUIPMENTNAME}</option>
                      )
                    }

                  </Form.Control>
                  <br></br>
                  <Form.Label>TimeSlots</Form.Label>
                  <Form.Control as="select" onChange={(ddl => this.setState({ TIMESLOTID: ddl.target.value }))} controlId="TimeSlotDropdown" >
                    {
                      this.state.slots.map(slots =>
                        < option value={slots.TIMESLOTID} >{slots.TIMESLOT}</option>
                      )
                    }

                  </Form.Control>
                  <br></br>


              

             

                

                  <Form.Group>
                    <Button type="submit">Submit!</Button>
                    <Button variant="danger" onClick={this.props.onHide}>Cancel</Button>
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
