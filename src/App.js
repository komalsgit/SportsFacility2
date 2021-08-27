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

class App extends Component {
  render(){
    return(
      <div className="App">
        <Switch>
          <Route exact path="/" component={Form} />
          <Route path="/usermanagement" component={UserManagement} />
          <Route path="/home" component={Home} />
          <Route path="/admin/facilitymodifier" component={FacilityModifier} />
          <Route path="/admin" component={FacilityOverview} />
          <Route path="/login" component={Login} />
          <Route path="/admin/facilityoverview" component={FacilityOverview} />
          <Route path="/admin/addfacility" component={AddFacility} />
          <Route path="/admin/usermanagement" component={UserManagement} />
          <Route path="/admin/home" component={Home} />
          <Route path="/home/usermanagement" component={UserManagement} />
          <Route path="/addsport" component={Form} />
          <Route path="/addfacility" component={AddFacility} />
        </Switch>
        
      </div>
    )
  }
}
export default App
