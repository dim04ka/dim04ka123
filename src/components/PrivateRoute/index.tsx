import { FC, useEffect } from "react";
import { useState } from 'react'
import Login from '../../pages/Login'
import { IS_AUTHENTICATED } from '../../consts'

const PrivateRoute = ({ Component }: { Component: FC }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = () => {
    const isAuthenticated = localStorage.getItem(IS_AUTHENTICATED)
    if (isAuthenticated === 'true') {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
      localStorage.removeItem(IS_AUTHENTICATED)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return isAuthenticated ? <Component /> : <Login />;
};
export default PrivateRoute;