import React from 'react';
import { Route, Redirect } from 'react-router-dom'; 

// Import custom modules
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
 
  const { user } = useAuth();

  return (
    <Route {...rest} render={
      props => {
        return user ? <Component {...props} /> : <Redirect to="/login" />
      } 
    }/>
  )
}

export default ProtectedRoute