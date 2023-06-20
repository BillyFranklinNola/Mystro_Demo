import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const { Link } = require("react-router-dom");

const NavBar = (props) => {
    const navigate = useNavigate();

    const logoutHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/musicians/logout', {}, {withCredentials: true})
        .then(res => {
            console.log(res)
            navigate('/')
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    return (
        <div className="navbar navbar-expand-xxl bg-secondary bg-gradient d-flex justify-content-between p-4  border border-2 border-black">
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