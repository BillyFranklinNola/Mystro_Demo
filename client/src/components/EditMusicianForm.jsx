import React, { useState } from 'react'

const EditMusicianForm = (props) => {
    const {
        initialFirstName, 
        initialLastName, 
        initialEmail, 
        initialInstrument, 
        onSubmitProp
    } = props;
    
    const [musician, setMusician] = useState({
        firstName: initialFirstName,
        lastName: initialLastName,
        email: initialEmail,
        instrument: initialInstrument,
    })

    const changeHandler = (e) => {
        setMusician({...musician, [e.target.name]:e.target.value})
        console.log(musician)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        onSubmitProp(musician)
    }

    return (
        <div className="col-4 bg-secondary mx-auto p-3 border border-3 border-dark rounded m-5">
            <form className='mx-auto' onSubmit={onSubmitHandler}>
                <div className='form-group m-3'>
                    <label htmlFor='firstName'>First Name:</label>
                    <input type="text" name="firstName" id="firstName" className="form-control" value={musician.firstName} onChange = {changeHandler}/>
                    {/* {
                        errors.firstName?
                        <p>{errors.firstName.message}</p>:
                        null
                    } */}
                </div>
                <div className='form-group m-3'>
                    <label htmlFor='lastName'>Last Name:</label>
                    <input type="text" name="lastName" id="lastName" className="form-control" value={musician.lastName} onChange = {changeHandler}/>
                    {/* {
                        errors.lastName?
                        <p>{errors.lastName.message}</p>:
                        null
                    } */}
                </div>
                <div className='form-group m-3'>
                    <label htmlFor='email'>Email:</label>
                    <input type="text" name="email" id="email" className="form-control" value={musician.email} onChange = {changeHandler}/>
                    {/* {
                        errors.email?
                        <p>{errors.email.message}</p>:
                        null
                    } */}
                </div>
                <div className='form-group m-3'>
                    <label htmlFor='instrument'>Instrument:</label>
                    <input type="text" name="instrument" id="instrument" className="form-control" value={musician.instrument} onChange = {changeHandler}/>
                    {/* {
                        errors.instrument?
                        <p>{errors.instrument.message}</p>:
                        null
                    } */}
                </div>
                <button input type="submit" className='btn btn-warning'>Submit</button>
            </form>
        </div>
    )
}
export default EditMusicianForm