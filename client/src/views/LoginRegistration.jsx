import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm'
import NavBar from '../components/NavBar'

const LoginRegistration = (props) => {

    // const createMusician = musician => {    
    //     axios.post('http://localhost:8000/api/musicians/register', musician, {withCredentials: true})
    //             .then(res=>{
    //                 console.log(res);
    //                 setMusician(res.data)
    //                 setAllMusicians([...allMusicians, res.data]);
    //                 navigate('/MusicianDashboard')
    //             })
    //             .catch(err=>{
    //                 console.log(err)
    //                 const errorResponse = err.response.data.message;
    //                 setErrors(errorResponse);
    //             });
    // }
    // const loginMusician = loginInfo => {
    //     axios.post('http://localhost:8000/api/musicians/login', loginInfo, {withCredentials: true})
    //     .then(res => {
    //         console.log(res)
    //         navigate('/MusicianDashboard')
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // }

return (
    <div style={{
        background: 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(0,107,141,1) 0%, rgba(0,69,91,1) 90%)',
    }}> 
        <div className='pt-3'>
            <NavBar/>
            <div className='container'>
                <div className='row p-5'>
                    <div className='col-sm-6'>
                        <h2 className="text-warning mx-auto">Login:</h2>
                        <LoginForm 
                            loginEmail="" 
                            loginPassword=""/>
                    </div>
                    <div className='col-sm-6'>
                        <h2 className="offset-md text-warning mx-auto">Register:</h2>
                        <RegisterForm 
                            initialFirstName="" 
                            initialLastName="" 
                            initialEmail="" 
                            initialInstrument="" 
                            initialPassword="" 
                            initialConfirmPassword=""/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}   

export default LoginRegistration