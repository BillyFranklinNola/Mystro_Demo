import React from 'react'
import LoginForm from '../components/LoginForm'
import '../styles/globals.css'


const LoginView = () => {

    return (
        <div className='viewport container-fluid col-10'>
            <div className='col-lg-6 mb-3 mb-lg-0 mx-auto'>
                <h2 className="subNav text-warning my-4 mx-auto">Login:</h2>
                <div className="mt-3">
                    <LoginForm 
                        loginEmail="" 
                        loginPassword=""/>
                </div>
            </div>
        </div>
    )
}   

export default LoginView