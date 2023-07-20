import React from 'react'
import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm'
import '../styles/globals.css'


const LoginRegistration = () => {

    return (
        <div className='viewport container-fluid col-10'>
            <div className='row'>
                <div className='col-sm-6 mb-3 mb-lg-0'>
                    <h2 className="subNav text-warning my-4 my-lg-5 mx-auto">Login:</h2>
                    <LoginForm 
                        loginEmail="" 
                        loginPassword=""/>
                </div>
                <div className='col-sm-6'>
                    <h2 className="subNav text-warning my-4 my-lg-5 mx-auto">Register:</h2>
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
    )
}   

export default LoginRegistration