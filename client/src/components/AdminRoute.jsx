import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children }) => {
    const loggedInMusician = useSelector((state) => state.auth.musician);
    console.log(loggedInMusician.musician.isAdmin);

    return (loggedInMusician && loggedInMusician.musician.isAdmin) ? (
        children
    ) : (
        <Navigate to="/MusicianDashboard"/>
    )
}

export default AdminRoute;