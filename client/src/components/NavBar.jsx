import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {useDispatch} from 'react-redux';
import {logout, reset} from '../slices/authSlice';

const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        <div className="row navbar navbar-expand-xxl p-4 rounded border border-2 border-black" style={{
            backgroundColor: "rgba(45, 45, 45, 0.75)"
        }}>
            <div className="container-fluid d-flex flex-column flex-lg-row align-items-center">
                <div className="d-flex align-items-center">
                    <a className="navbar-brand text-warning fs-2 me-3">
                        NOLA Live Productions
                    </a>
                </div>
                <div className="d-flex flex-column flex-sm-row mt-3 mt-lg-0">
                    <Link className="btn btn-warning me-sm-2" to='/AdminDashboard'>Admin Dashboard</Link>
                    <Link className="btn btn-warning me-sm-2 mt-2 mt-sm-0" to='/MusicianDashboard'>Musician Dashboard</Link>
                    <div className="btn btn-warning mt-2 mt-sm-0" onClick={logoutHandler}>
                        Logout
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar;