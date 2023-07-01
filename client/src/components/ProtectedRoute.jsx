import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const ProtectedRoute = ({ children }) => {
    const loggedInMusician = useSelector((state) => state.auth.musician);
    console.log(loggedInMusician);
    return (loggedInMusician) ? children : <Navigate to="/unauthorized"/>
}

export default ProtectedRoute;

