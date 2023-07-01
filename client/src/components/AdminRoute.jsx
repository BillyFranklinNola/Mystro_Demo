import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children }) => {
    const loggedInMusician = useSelector((state) => state.auth.musician);
    console.log(loggedInMusician);

    const isAdmin = () => {
        if (loggedInMusician) {
            return loggedInMusician.isAdmin;
        } else {
            return false;
        }
    }
    console.log(isAdmin);
    return (loggedInMusician && isAdmin) ? children : <Navigate to="/unauthorized"/>
}

export default AdminRoute;