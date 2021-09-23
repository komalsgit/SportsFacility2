import React, { useState, useEffect } from "react";
import { Row,Col,Table, Button, ButtonToolbar,Form } from 'react-bootstrap';
import { auth } from './firebase';
//import { toast } from "react-toastify";
import {toast,ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"


const ForgotPassword = () => {
    const [email,setEmail] = useState("");
    const [loading,setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const config ={
            url: 'http://localhost:3000/register/complete',
           // handleCodeInApp: ,
        };
        await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
            setEmail("");
            setLoading(false);
            toast.success("Check your email for password reset link");
        })
        .catch((error) => {
            setLoading(false);
            toast.error(error.message);
            console.log("ERROR MSG IN FORGOT PASSWORD",error);
        });
    };




return (

    <div>
         <ToastContainer/>
        {loading ? (<h4 className = "text-danger">Loading</h4>):(<h4>Forgot Password</h4>)}
         
    <form class="frm1" onSubmit={handleSubmit}>
  
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
           value={email}
         //  name="EMAIL"
          // id="EMAIL"
           required
           onChange={(e) => setEmail(e.target.value)}
           autoFocus
           placeholder="Type your Email"
           />
           </Form.Group>
           </Col>
           </Row>
          
         
  <br></br>
  <Row>
    <Col  xs={10} md={3}></Col>
           <Col  xs={5} md={5}  class="col">
     <div className="App">
     <Button type="submit" disabled={!email}>Submit</Button>
     </div>
      </Col>
    </Row>
    
  <br></br>
  <br></br>
  <h4 class="h5">@ABC sports Facility</h4>
     </form>
     </div>
    
   
     



);
};
export default ForgotPassword;