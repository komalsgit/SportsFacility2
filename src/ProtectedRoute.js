import React, { Component } from 'react';
import { Route, Redirect,Link } from "react-router-dom";


const ProtectedRoute = ({component:Cmp, ...rest}) => (
    <Route
    {...rest}
    render ={ props => {
      const loc=localStorage.getItem('val')
      if (loc == 1)
        {
           return <Redirect to = {{ pathname: '/home'}}/>
           
           ///<Cmp {...props}/>
           
        }
      // else   if (loc == 2)
       // {
        //  return <Redirect to = {{ pathname: '/home'}}/>
           
           ///<Cmp {...props}/>
           
     //  }
      //  else  if (loc != 1)
      //  {
         //   return <Redirect to ="/login2"/>
      //  }
        else {
        return <Cmp {...props}/>
        }
    }} />
 )


 /*const ProtectedRoute = ({component:Cmp, ...rest}) => (

    <Route
    {...rest}
    render ={(props) =>
    localStorage.getItem('Login2') ?
   ( <Cmp {...props} />
):
<Redirect to ="/login2"
/>

}
/>
)

/*
const ProtectedRoute = ({component:Cmp, ...rest}) => (

    <Route
    {...rest}
    render ={(props) =>
    localStorage.getItem('Login2') ?
   ( <Cmp {...props} />
):
<Redirect to ="/login2"
/>

}
/>
)




 /* const ProtectedRoute = ({component:Cmp, ...rest}) => (
    <Route
    {...rest}
    render ={(props) => {

      if (localStorage.getItem('Email') =='41kmp@gmail.com')
        {
            return <Redirect to = {{ pathname:'/Login2'}} />
        }
        return <Component {...props}/>
      
    }} />
 )
    //localStorage.getItem('Login2') ?
//( <Cmp {...props} /> 
   // ):
   // <Redirect to ="/login2"
  //  />
   // }
//}
///>
//)



/*function ProtectedRoute({isAuth: isAuth,component:Component, ...rest }) {
  return(
        
        <Route
        {...rest}
        render={(props) => {
            if (isAuth) {
                return <Component />;
            }else{
                return (
                    <Redirect to ={{ pathname:"/home", state: {from: props.location }}} />
                );
            }
        }}
        />
       
  );
}
/*
 const ProtectedRoute = ({component:Component, ...rest }) => (
  
        <Route
        {...rest}
        render={(props) => (
            isAuth.isAuthenticated === true 
            ? <Component {...props} />
            : <Redirect to ='/home' />
         
            
            
        )}
        />
    )*/


export default ProtectedRoute