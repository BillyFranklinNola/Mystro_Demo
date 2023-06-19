import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm'
import NavBar from '../components/NavBar'

const LoginRegistration = (props) => {
    const [allMusicians, setAllMusicians] = useState([]);
    const [musician, setMusician] = useState(props);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();


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
    const loginMusician = loginInfo => {
        axios.post('http://localhost:8000/api/musicians/login', loginInfo, {withCredentials: true})
        .then(res => {
            console.log(res)
            navigate('/MusicianDashboard')
        })
        .catch(err => {
            console.log(err)
        })
    }

return (
    <div style={{
        background: 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(0,107,141,1) 0%, rgba(0,69,91,1) 90%)',
    }}>
        <NavBar/>
        <div className='d-flex mt-5'>
        </div>
        <div className='d-flex justify-content-around'>
            {errors.map((err, index) => <p className='text-danger' key={index}>{err}</p>)}
            <div>
                <h2 className="text-warning mx-auto">Login:</h2>
                <LoginForm onSubmitProp={loginMusician} loginEmail="" loginPassword=""/>
            </div>
            <div>
            <h2 className="text-warning mx-auto align-items-center">OR</h2>
            </div>
            <div>
                <h2 className="text-warning mx-auto">Register:</h2>
                <RegisterForm initialFirstName="" initialLastName="" initialEmail="" initialInstrument="" initialPassword="" initialConfirmPassword=""/>
            </div>
        </div>
    </div>
    )
}   

export default LoginRegistration