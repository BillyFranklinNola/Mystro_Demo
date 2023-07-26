import React, {useEffect, useState} from "react";
import {useNavigate, Link,} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import {logout, reset} from '../slices/authSlice';

const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loggedInMusician = useSelector((state) => state.auth.musician);
    console.log(loggedInMusician);
    const isAdmin = loggedInMusician? loggedInMusician.musician.isAdmin
    : false;

    const logoutHandler = () => {
        try {
            axios.post('http://localhost:8000/api/musicians/logout', {}, {withCredentials: true});
            dispatch(logout());
            dispatch(reset());
            navigate('/');
        } catch (err) {
            console.error('Error logging out', err);
            }
    }

    return (
        <div className="row navbar navbar-expand-xxl p-4 rounded border border-2 border-dark" style={{
            backgroundColor: "rgba(45, 45, 45, 0.75)"
        }}>
            <div className="container d-flex flex-column flex-lg-row align-items-center">
                <div className="d-flex align-items-center">
                    <a className="navbar-brand text-warning fs-2 mx-auto me-lg-3">
                        NOLA Live Productions
                    </a>
                </div>
                <div className="d-flex flex-column flex-sm-row mt-3 mt-lg-0 mx-auto mx-lg-0">
                    {
                    loggedInMusician && isAdmin?
                    <Link className="btn btn-warning me-sm-2" to='/AdminDashboard'>Admin Dashboard</Link>
                    : null
                    }
                    <Link className="btn btn-warning me-sm-2 mt-2 mt-sm-0" to='/MusicianDashboard'>Dashboard</Link>
                    {
                    loggedInMusician? (
                    <div className="btn btn-warning mt-2 mt-sm-0" onClick={logoutHandler}>
                        Logout
                    </div>
                    ) : (
                    null
                    )}
                </div>
            </div>
        </div>
    )
}

export default NavBar;