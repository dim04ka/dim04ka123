import { FC, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useState } from 'react'
import Login from '../../pages/Login'

const PrivateRoute = ({ Component }: { Component: FC }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    console.log('isAuthenticated', isAuthenticated)
    if (isAuthenticated === 'true') {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
      localStorage.removeItem('isAuthenticated')
    }
  }, [])

  // Your authentication logic goes here...

  return isAuthenticated ? <Component /> : <Login />;
};
export default PrivateRoute;