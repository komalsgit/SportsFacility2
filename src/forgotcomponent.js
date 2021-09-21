import React, { Component } from 'react'
import { Row,Col,Table, Button, ButtonToolbar,Form } from 'react-bootstrap';
import axios from 'axios';

export  class forgotcomponent extends Component {

    handleSubmit = e => {
    e.preventDefault();

     const data = {
     EMAIL: this.EMAIL
        };

        axios.post('http://localhost:8000/forgot', this.EMAIL).then(
            res => {
                console.log(res)
                alert(data)
            }
        ).catch(
            err => {
                console.log(err); 
                alert("error")
                alert(this.EMAIL)
            }
        )
    }
 render() {
     return (

        <div>
        <form class="frm1" onSubmit={this.handleSubmit}>

      <div  >
  <h1  class="wrapper"> ⚽⚾  ABC Sports Facility  🎾🏀</h1>
  </div>
 
<br></br>
  <h2 class="h2">  ✦ Forgot Password ✦</h2>
  <br></br>
<Row class="row">
<Col  xs={3} md={3}></Col>
<Col xs={6} md={6} class="col">
  <Form.Group   className="loginText" controlid="EMAIL">
               <Form.Label>✦  Email Id</Form.Label>
               <Form.Control
               className="loginText"
               type="email"
               name="EMAIL"
               id="EMAIL"
               required
               onChange={e => this.EMAIL = e.target.value}
               />
               </Form.Group>
               </Col>
               </Row>
              
             
      <br></br>
      <Row>
        <Col  xs={10} md={3}></Col>
               <Col  xs={5} md={5}  class="col">
         <div className="App">
         <Button type="submit">Submit</Button>
         </div>
          </Col>
        </Row>
        
      <br></br>
      <br></br>
      <h4 class="h5">@ABC sports Facility</h4>
         </form>
         </div>
        
       
         

  

);
}

   //  )



 }


//}