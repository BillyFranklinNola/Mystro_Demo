import React from 'react'
import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm'
import NavBar from '../components/NavBar'
import image from '../images/backgroundimage.jpg'
import '../styles/globals.css'

const LoginRegistration = () => {

    console.log(image)


return (
    // <div style={{
    //     background: 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(0,107,141,1) 0%, rgba(0,69,91,1) 90%)',
    //     minHeight: "100vh"
    // }}> 
    <div className='bg-image' style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: 'center',
        minHeight: '100vh',
    }}>
        <div className="pt-3">
            <NavBar/>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-6'>
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
        </div>
    </div>
    )
}   

export default LoginRegistration