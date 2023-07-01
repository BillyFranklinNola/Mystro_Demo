import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {useSelector, useDispatch} from 'react-redux';
import {logout, reducer, reset} from '../slices/authSlice';

const NavBar = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {musician} = useSelector((state) => state.auth);

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
        <div className="navbar navbar-expand-xxl bg-secondary bg-gradient d-flex justify-content-between p-4 rounded border border-2 border-black mx-3">
            <a className="navbar-brand text-warning fs-2">
                NOLA Live Productions
            </a>
            <div>
                <Link className="btn btn-warning ms-3" to='/AdminDashboard'>Admin Dashboard</Link>
                <Link className="btn btn-warning ms-3" to='/MusicianDashboard'>Musician Dashboard</Link>
                <div className="btn btn-warning ms-3" onClick={logoutHandler}>
                    Logout
                </div>
            </div>
        </div>
    )
}

export default NavBar;