import React from "react";
import RegisterForm from "../components/RegisterForm";
import '../styles/globals.css'


const CreateMusician = () => {

    return (
        <div className='viewport container-fluid pb-5'>
            <div className='col-sm-6 mx-auto'>
                <h2 className="subNav text-warning my-4 my-lg-5 mx-auto">Add New Musician:</h2>
                <RegisterForm 
                    initialFirstName="" 
                    initialLastName="" 
                    initialEmail="" 
                    initialInstrument="" 
                    initialPassword="" 
                    initialConfirmPassword=""/>
            </div>
        </div>
    )
}

export default CreateMusician