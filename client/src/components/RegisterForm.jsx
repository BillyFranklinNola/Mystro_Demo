import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../slices/authSlice';

const RegisterForm = (props) => {
    const {
        initialFirstName,
        initialLastName, 
        initialEmail, 
        initialInstrument, 
        initialPassword , 
        initialConfirmPassword} 
        = props;

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
    const {errors} = useSelector((state) => state.auth)
    const {firstName,
        lastName,
        email, 
        instrument, 
        password, 
        confirmPassword
    } = musicianData;

    const {musician, 
        isLoading, 
        isSuccess, 
        message
    } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isSuccess && musician) {
            navigate('/MusicianDashboard')
        }
        if (errors) {
            Object.keys(errors).map((key) => {
                toast.error(errors[key])
            })
        }
    }, [musician, errors, isSuccess, message, navigate, dispatch])

    const changeHandler = (e) => {
        setMusicianData((prevState) => ({
            ...prevState, 
            [e.target.name]:e.target.value
        }))
        console.log(musicianData)
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const musicianData = {
            firstName, 
            lastName, 
            email, 
            instrument, 
            password, 
            confirmPassword 
        }
        const response = await dispatch(register(musicianData))
        if (response.payload) {
        } else if (response.payload) {
            const {errors} = response.payload
            Object.keys(errors).forEach((key) => {
                toast.error(errors[key])
            })}
    }
    if (isLoading) {
        return <h1>Loading...</h1>
    }


    return (
        <div className='container-fluid'>
            <div className="bg-secondary mx-auto p-3 border border-3 border-dark rounded">
                <form className='mx-auto' onSubmit={onSubmitHandler}>
                    <div className='form-group m-3'>
                        <label htmlFor='firstName'>First Name:</label>
                        <input type="text" name="firstName" id="firstName" className="form-control" value={musicianData.firstName} onChange = {changeHandler}/>
                    </div>
                    <div className='form-group m-3'>
                        <label htmlFor='lastName'>Last Name:</label>
                        <input type="text" name="lastName" id="lastName" className="form-control" value={musicianData.lastName} onChange = {changeHandler}/>
                    </div>
                    <div className='form-group m-3'>
                        <label htmlFor='email'>Email:</label>
                        <input type="text" name="email" id="email" className="form-control" value={musicianData.email} onChange = {changeHandler}/>
                    </div>
                    <div className='form-group m-3'>
                        <label htmlFor='instrument'>Instrument:</label>
                        <input type="text" name="instrument" id="instrument" className="form-control" value={musicianData.instrument} onChange = {changeHandler}/>
                    </div>
                    <div className='form-group m-3'>
                        <label htmlFor='password'>Password:</label>
                        <input type="password" name="password" id="password" className="form-control" value={musicianData.password} onChange = {changeHandler}/>
                    </div>
                    <div className='form-group m-3'>
                        <label htmlFor='confirmPassword'>Confirm Password:</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" className="form-control" value={musicianData.confirmPassword} onChange = {changeHandler}/>
                    </div>
                    <button input type="submit" className='btn btn-warning'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm