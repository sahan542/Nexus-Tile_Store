import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const RequireAuth = ({ children }) => {
    const userId = localStorage.getItem("userId");
    const location = useLocation();
    if (!userId){
        return <Navigate to="/login" state={{ path: location.pathname }}></Navigate>
    }
  return children
}

export default RequireAuth