import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../slices/authSlice';
import { reset } from '../slices/authSlice';


const RegisterForm = (props) => {
    const {initialFirstName, initialLastName, initialEmail, initialInstrument, initialPassword , initialConfirmPassword} = props;
    const [musicianData, setMusicianData] = useState({
        firstName: initialFirstName,
        lastName: initialLastName,
        email: initialEmail,
        instrument: initialInstrument,
        password: initialPassword,
        confirmPassword: initialConfirmPassword
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [errors, setErrors] = useState({})

    const {firstName, lastName, email, instrument, password, confirmPassword} = musicianData;

    const {musician, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || musician) {
            navigate('/')
        }

        dispatch (reset())
    }, [musician, isError, isSuccess, message, navigate, dispatch])

    const changeHandler = (e) => {
        setMusicianData((prevState) => ({...prevState, [e.target.name]:e.target.value}))
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords don't match")
        } else {
            const musicianData = { firstName, lastName, email, instrument, password, confirmPassword }
            dispatch(register(musicianData))
            navigate('/MusicianDashboard')  
        // onSubmitProp(musicianData)
    }
    if (isLoading) {
        return <h1>Loading...</h1>
    }
}


    return (
        <div className="bg-secondary mx-auto p-3 border border-3 border-dark rounded m-5">
            <form className='mx-auto' onSubmit={onSubmitHandler}>
                <div className='form-group m-3'>
                    <label htmlFor='firstName'>First Name:</label>
                    <input type="text" name="firstName" id="firstName" className="form-control" value={musicianData.firstName} onChange = {changeHandler}/>
                    {
                        errors.firstName?
                        <p>{errors.firstName.message}</p>:
                        null
                    }
                </div>
                <div className='form-group m-3'>
                    <label htmlFor='lastName'>Last Name:</label>
                    <input type="text" name="lastName" id="lastName" className="form-control" value={musicianData.lastName} onChange = {changeHandler}/>
                    {
                        errors.lastName?
                        <p>{errors.lastName.message}</p>:
                        null
                    }
                </div>
                <div className='form-group m-3'>
                    <label htmlFor='email'>Email:</label>
                    <input type="text" name="email" id="email" className="form-control" value={musicianData.email} onChange = {changeHandler}/>
                    {
                        errors.email?
                        <p>{errors.email.message}</p>:
                        null
                    }
                </div>
                <div className='form-group m-3'>
                    <label htmlFor='instrument'>Instrument:</label>
                    <input type="text" name="instrument" id="instrument" className="form-control" value={musicianData.instrument} onChange = {changeHandler}/>
                    {
                        errors.instrument?
                        <p>{errors.instrument.message}</p>:
                        null
                    }
                </div>
                <div className='form-group m-3'>
                    <label htmlFor='password'>Password:</label>
                    <input type="password" name="password" id="password" className="form-control" value={musicianData.password} onChange = {changeHandler}/>
                    {
                        errors.password?
                        <p>{errors.password.message}</p>:
                        null
                    }
                </div>
                <div className='form-group m-3'>
                    <label htmlFor='confirmPassword'>Confirm Password:</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" className="form-control" value={musicianData.confirmPassword} onChange = {changeHandler}/>
                    {
                        errors.confirmPassword?
                        <p>{errors.confirmPassword.message}</p>:
                        null
                    }
                </div>
                <button input type="submit" className='btn btn-warning'>Submit</button>
            </form>
        </div>
    )
}
export default RegisterForm