import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Link,NavLink,Switch,Route,Redirect } from "react-router-dom";
//import Login2 from './Login2';
//import {ProductProvider} from './Context';
//import  {AddFacModel} from './AddFacModel'; 



ReactDOM.render(
  <BrowserRouter>
  
 
  
    <App />
   
   
 
 
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
