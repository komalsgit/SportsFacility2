import React, { Component } from 'react';
import './App.css';

import './FacilityModifier';
import './TableApp.css';
import './FacilityOverview';
import './AddFacility';
import{ Route, Switch } from "react-router-dom";
import Form from './Form';
import UserManagement from './UserManagement';
import Home from './Home';
import FacilityModifier from './FacilityModifier';
import Login from './Login';
import FacilityOverview from './FacilityOverview';
import AddFacility from './AddFacility';
import App1 from './App1';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Login2 from './Login2';
import { AddRoleModal } from './AddRoleModal';

class App extends Component {
  render(){
    return(
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login2} />
          <Route path="/Login" component={App1}/>
          <Route path="/Registration" component={AddRoleModal}/>
          <Route path="/Registration/login" component={Login2}/>
          <Route path="/usermanagement" component={UserManagement} />
          <Route path="/home" component={Home} />
          <Route path="/admin/facilitymodifier" component={FacilityModifier} />
          <Route path="/admin" component={FacilityOverview} />
          <Route path="/login" component={LoginForm} />
          <Route path="/login/home" component={Home} />
          <Route path="/admin/facilityoverview" component={FacilityOverview} />
          <Route path="/admin/addfacility" component={AddFacility} />
          <Route path="/admin/usermanagement" component={UserManagement} />
          <Route path="/admin/home" component={Home} />
          <Route path="/home/usermanagement" component={UserManagement} />
          <Route path="/addsport" component={Form} />
          <Route path="/addfacility" component={AddFacility} />
          <Route path="/login2" component={Login2} />
          <Route path="/login2/home" component={Home} />
        </Switch>
        
      </div>
    )
  }
}
export default App
