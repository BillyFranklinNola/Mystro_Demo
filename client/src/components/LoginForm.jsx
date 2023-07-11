import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../slices/authSlice';

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
        console.log(loginInfo)
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
        <div className='container-fluid'>
            <div className="bg-secondary mx-auto p-3 border border-3 border-dark rounded m-5">
                <form className='mx-auto' onSubmit={onSubmitHandler}>
                    <div className='form-group m-3'>
                        <label htmlFor='email'>Email:</label>
                        <input type="text" name="email" id="email" className="form-control" onChange = {logChangeHandler}/>
                    </div>
                    <div className='form-group m-3'>
                        <label htmlFor='password'>Password:</label>
                        <input type="password" name="password" id="password" className="form-control" onChange = {logChangeHandler}/>
                    </div>
                    <button type="submit" className='btn btn-warning'>Submit</button>
                </form>
            </div>
        </div>
    )
}
export default LoginForm