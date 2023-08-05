import React, {useEffect} from "react";
import {useNavigate, Link,} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import {logout, reset} from '../slices/authSlice';

const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loggedInMusician = useSelector((state) => state.auth.musician);
    const isAdmin = loggedInMusician? loggedInMusician.musician.isAdmin
    : false;

    const logoutHandler = () => {
        try {
            axios.post('/api/musicians/logout', {}, {withCredentials: true});
            dispatch(logout());
            dispatch(reset());
            navigate('/');
        } catch (err) {
            console.error('Error logging out', err);
            }
    }

    return (
        <div className="row navbar navbar-expand-xxl px-2 px-sm-4 py-4 rounded border border-2 border-dark" style={{
            backgroundColor: "rgba(45, 45, 45, 0.75)"
        }}>
            <div className="container d-flex flex-column flex-lg-row align-items-center">
                <div className="d-flex align-items-center">
                    <h2 className="text-warning mx-auto me-lg-3">
                        NOLA Live Productions
                    </h2>
                </div>
                <div className="d-flex flex-column flex-sm-row mt-3 mt-lg-0 mx-auto mx-lg-0">
                    {
                    loggedInMusician && isAdmin?
                    <Link className="btn btn-warning me-sm-2" to='/AdminDashboard'>Admin Dashboard</Link>
                    : null
                    }
                    <Link className="btn btn-warning mt-2 mt-sm-0" to='/MusicianDashboard'>Dashboard</Link>
                    {
                    loggedInMusician? (
                    <div className="btn btn-warning mt-2 mt-sm-0 ms-sm-2" onClick={logoutHandler}>
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