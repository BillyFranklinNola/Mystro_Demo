import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import RegisterForm from '../components/RegisterForm'

const LoginRegistration = (props) => {
    const [allMusicians, setAllMusicians] = useState([]);
    const [musician, setMusician] = useState(props);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();


    const createMusician = musician => {    
        axios.post('http://localhost:8000/api/registerMusician', musician, {withCredentials: true})
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
    // const [loginInfo, setLoginInfo] = useState({
    //     email: "",
    //     password: ""
    // })

    // const logChangeHandler = (e) => {
    //     setLoginInfo({
    //         ...loginInfo, 
    //         [e.target.name]:e.target.value
    //     })
    // }

    // const loginHandler = (e) => {
    //     e.preventDefault();
    //     axios.post('http://localhost:8000/api/login', loginInfo, {withCredentials: true})
    //     .then(res => {
    //         console.log(res)
    //         navigate('/MusicianDashboard')
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    }

return (
    <div>
        {errors.map((err, index) => <p className='text-danger' key={index}>{err}</p>)}
        <RegisterForm onSubmitProp={createMusician} initialFirstName="" initialLastName="" initialEmail="" initialInstrument="" initialPassword="" initialConfirmPassword=""/>
    </div>
    )
}   

export default LoginRegistration