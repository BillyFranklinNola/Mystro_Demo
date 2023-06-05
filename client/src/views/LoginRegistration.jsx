import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm'

const LoginRegistration = (props) => {
    const [allMusicians, setAllMusicians] = useState([]);
    const [musician, setMusician] = useState(props);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();


    const createMusician = musician => {    
        axios.post('http://localhost:8000/api/musicians/register', musician, {withCredentials: true})
                .then(res=>{
                    console.log(res);
                    setMusician(res.data)
                    setAllMusicians([...allMusicians, res.data]);
                    navigate('/musicians/list')
                })
                .catch(err=>{
                    console.log("hello")
                    console.log(err)
                    const errorResponse = err.response.data.message;
                    const errorArray = [];
                    for (const key of Object.keys(errorResponse)) 
                        {errorArray.push(errorResponse[key].message)}
                    setErrors(errorArray);
                });
    }
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
    <div className='d-flex'>
        {errors.map((err, index) => <p className='text-danger' key={index}>{err}</p>)}
        <RegisterForm onSubmitProp={createMusician} initialFirstName="" initialLastName="" initialEmail="" initialInstrument="" initialPassword="" initialConfirmPassword=""/>
        <LoginForm onSubmitProp={loginMusician} loginEmail="" loginPassword=""/>
    </div>
    )
}   

export default LoginRegistration