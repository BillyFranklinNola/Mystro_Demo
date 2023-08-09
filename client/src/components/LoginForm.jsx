import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../slices/authSlice';
import '../styles/globals.css'

const LoginForm = (props) => {
    const {loginEmail, loginPassword} = props;
    const [loginInfo, setLoginInfo] = useState({
        email: loginEmail,
        password: loginPassword,
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        musician, 
        isLoading, 
        isSuccess, 
        message
    } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isSuccess || musician) {
            musician.isAdmin ? navigate('/AdminDashboard') :
            navigate('/MusicianDashboard')
        }
        if (message) {
            toast.error(message)
        }
    }, [
        musician, 
        isSuccess, 
        message, 
        navigate, 
        dispatch
    ])

    const logChangeHandler = (e) => {
        setLoginInfo((prevState) => ({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const { email, password } = loginInfo
        const loginData = { email, password }
        dispatch(login(loginData))
    }
    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='container'>
            <div className="panelBackground text-white mx-auto p-3 border border-2 border-dark rounded">
                <form className='mx-auto' onSubmit={onSubmitHandler}>
                    <div className='row form-group align-items-center mt-4'>
                        <label htmlFor='email' className='col-4 col-lg-3 col-form-label me-2'>Email:</label>
                        <div className='col-7 col-lg-8'>
                            <input type="text" name="email" id="email" className="form-control" onChange = {logChangeHandler}/>
                        </div>
                    </div>
                    <div className='row form-group align-items-center mt-4 mb-3'>
                        <label htmlFor='password' className='col-4 col-lg-3 col-form-label me-2'>Password:</label>
                        <div className='col-7 col-lg-8'>
                            <input type="password" name="password" id="password" className="form-control" onChange = {logChangeHandler}/>
                        </div>
                    </div>
                    <button type="submit" className='btn btn-warning mt-4 mb-4 mx-auto'>Submit</button>
                </form>
            </div>
        </div>
    )
}
export default LoginForm