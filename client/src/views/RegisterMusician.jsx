import React from 'react'
import RegisterForm from '../components/RegisterForm'
import '../styles/globals.css'


const RegisterMusician = () => {

    return (
        <div className='viewport container-fluid col-10'>
            <div className='col-lg-6 mx-auto'>
                <h2 className="subNav text-warning my-4 mx-auto">New Musician:</h2>
                <div className="mt-lg-3">
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

export default RegisterMusician