import React,{ useState, UseState } from 'react';
import './Login.css';

const Login =()=>{
  const[name,setName]= React.useState("");
  const [fullName,setFullName]= React.useState('');
  const[password,setPassword]= React.useState('');

  const onSubmits=(event)=>{
    event.preventDefault();
    setFullName(name);
  };
  const inputEvent=(event)=>{
    console.log(event.target.value);
    setName(event.target.value);
    
  };
  const inputEventtwo=(event)=>{
    setPassword(event.target.value);
  };


  return (
    
    <div className="main_div">
      <form onSubmit={onSubmits} class="frm1">
      <h1 class="wrapper">ABC Sports Facility</h1>
		
    <h2 class="h2">LogIn Page</h2>
    <br></br>
        <div>
        <h1>Welcome {fullName}</h1>
         <input
          type="text"
          placeholder="Enter Login Id"
          onChange={inputEvent}
         value={name}
       />
          <br />
          <br />
          <div>
         <input
          type="text"
          placeholder="Enter Password"
          onChange={inputEventtwo}
         value={password}
        />
          <br />
          <br />

        <button type="submit"><a href="Home/Booking">Submit</a></button>
    </div>
    </div>
    </form>
    </div>
    
    
  );
}

export default Login;
