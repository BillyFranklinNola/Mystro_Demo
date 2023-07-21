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

    const [formState, setFormState] = useState({
        firstName: initialFirstName,
        lastName: initialLastName,
        email: initialEmail,
        instrument: initialInstrument,
        password: initialPassword,
        confirmPassword: initialConfirmPassword,
        isSubmitted: false,
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {errors} = useSelector((state) => state.auth)
    const {
        firstName,
        lastName,
        email, 
        instrument, 
        password, 
        confirmPassword,
        isSubmitted
    } = formState;

    const {musician, 
        isLoading, 
        isSuccess, 
        message
    } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isSuccess && isSubmitted) {
            navigate('/AdminDashboard')
        }
        if (errors) {
            Object.keys(errors).map((key) => {
                toast.error(errors[key])
            })
        }
    }, [musician, errors, isSuccess, message, navigate, dispatch])

    const changeHandler = (e) => {
        setFormState((prevState) => ({
            ...prevState, 
            [e.target.name]:e.target.value
        }))
        console.log(formState)
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
            setFormState((prevState) => ({
                ...prevState,
                isSubmitted: true,
            }))
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
            <div className="panelBackground text-white mx-auto p-3 border border-2 border-dark rounded">
                <form className='mx-auto' onSubmit={onSubmitHandler}>
                    <div className='row form-group align-items-center mt-4'>
                        <label htmlFor='firstName' className='col-4 col-lg-3 col-form-label me-2'>First Name:</label>
                        <div className='col-7 col-lg-8'>
                            <input type="text" name="firstName" id="firstName" className="form-control" onChange = {changeHandler}/>
                        </div>
                    </div>
                    <div className='row form-group align-items-center mt-4'>
                        <label htmlFor='lastName' className='col-4 col-lg-3 col-form-label me-2'>Last Name:</label>
                        <div className='col-7 col-lg-8'>
                            <input type="text" name="lastName" id="lastName" className="form-control" onChange = {changeHandler}/>
                        </div>
                    </div>
                    <div className='row form-group align-items-center mt-4'>
                        <label htmlFor='email' className='col-4 col-lg-3 col-form-label me-2'>Email:</label>
                        <div className='col-7 col-lg-8'>
                            <input type="text" name="email" id="email" className="form-control" onChange = {changeHandler}/>
                        </div>
                    </div>
                    <div className='row form-group align-items-center mt-4'>
                        <label htmlFor='instrument' className='col-4 col-lg-3 col-form-label me-2'>Instrument:</label>
                        <div className='col-7 col-lg-8'>
                            <input type="text" name="instrument" id="instrument" className="form-control" onChange = {changeHandler}/>
                        </div>
                    </div>
                    <div className='row form-group align-items-center mt-4'>
                        <label htmlFor='password' className='col-4 col-lg-3 col-form-label me-2'>Password:</label>
                        <div className='col-7 col-lg-8'>
                            <input type="password" name="password" id="password" className="form-control" onChange = {changeHandler}/>
                        </div>
                    </div>
                    <div className='row form-group align-items-center mt-4'>
                        <label htmlFor='confirmPassword' className='col-4 col-lg-3 col-form-label me-2'>Confirm Password:</label>
                        <div className='col-7 col-lg-8'>
                            <input type="password" name="confirmPassword" id="confirmPassword" className="form-control" onChange = {changeHandler}/>
                        </div>
                    </div>
                    <button input type="submit" className='btn btn-warning mt-4 mb-3'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm