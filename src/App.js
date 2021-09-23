import React, { useState,Component } from 'react';
//import { BrowserRouter as Router,Link, Route, Switch } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './ProtectedRoute';
import './FacilityModifier';
import './TableApp.css';
import './FacilityOverview';
import './AddFacility';
import{  BrowserRouter as Router,Link,Route, Switch } from "react-router-dom";
import {Modal,Button,Row,Col,Form,} from 'react-bootstrap';
//import Form from './Form';
import UserManagement from './UserManagement';
import  Home  from './Home';
import FacilityModifier from './FacilityModifier';
import Login from './Login';
import FacilityOverview from './FacilityOverview';
import AddFacility from './AddFacility';
import App1 from './App1';
import LoginForm from './components/LoginForm/LoginForm';
import Logout from './Logout';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Login2 from './Login2';
import { AddRoleModal } from './AddRoleModal';
import { forgotcomponent } from './forgotcomponent';
import ForgotPassword from './ForgotPassword';


 

class App extends Component {
  constructor(props) {
    super(props);
   // var cors = require('cors')

   // App.use(cors()) 
   
  //  this.state = {
    //  isAuth: false
   // };
  }
 
 
  render(){
 
  //  const[isAuth,setIsAuth]=useState(false)
  //alert(this.props)
    return(
      <div className="App">
        <Router>
        <Switch>
          <Route exact path="/" component={Login2} />
          <Route path="/Login" component={App1}/>
          <Route path="/Registration" component={AddRoleModal}/>
          <Route path="/Registration/login" component={Login2}/>
          <ProtectedRoute path="/usermanagement" component={UserManagement}  />
         
          <Route path="/home" component={Home}  />
        
          <ProtectedRoute path="/admin/facilitymodifier" component={FacilityModifier} />
          <ProtectedRoute path="/admin" component={FacilityOverview}  />
          <Route path="/login" component={LoginForm} />
          <Route path="/login/home" component={Home} />
          <ProtectedRoute path="/admin/facilityoverview" component={FacilityOverview} />
          <Route path="/admin/addfacility" component={AddFacility} />
          <ProtectedRoute path="/admin/usermanagement" component={UserManagement}   />
          <Route path="/admin/home" component={Home} />
          <ProtectedRoute path="/home/usermanagement" component={UserManagement}  />
          <Route path="/addsport" component={Form} />
          <Route path="/addfacility" component={AddFacility} />
          <Route path="/login2" component={Login2} />
          <Route path="/login2/home" component={Home} />
          <Route path="/logout" component={Logout} />
          <Route path="/forgot" component={forgotcomponent} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          
        </Switch>
        </Router>
      </div>
    )
  }
}
export default App
