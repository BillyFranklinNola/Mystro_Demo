import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const ProtectedRoute = ({ children }) => {
    const loggedInMusician = useSelector((state) => state.auth.musician);
    return (loggedInMusician) ? children : <Navigate to="/"/>
}

export default ProtectedRoute;

