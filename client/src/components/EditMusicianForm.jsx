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
        <div className='container-fluid'>
            <div className="col-10 col-md-8 col-lg-5 bg-secondary mx-auto p-3 border border-3 border-dark rounded m-5">
                <form className='mx-auto' onSubmit={onSubmitHandler}>
                    <div className='form-group m-3'>
                        <label htmlFor='firstName'>First Name:</label>
                        <input type="text" name="firstName" id="firstName" className="form-control" value={musician.firstName} onChange = {changeHandler}/>
                    </div>
                    <div className='form-group m-3'>
                        <label htmlFor='lastName'>Last Name:</label>
                        <input type="text" name="lastName" id="lastName" className="form-control" value={musician.lastName} onChange = {changeHandler}/>
                    </div>
                    <div className='form-group m-3'>
                        <label htmlFor='email'>Email:</label>
                        <input type="text" name="email" id="email" className="form-control" value={musician.email} onChange = {changeHandler}/>
                    </div>
                    <div className='form-group m-3'>
                        <label htmlFor='instrument'>Instrument:</label>
                        <input type="text" name="instrument" id="instrument" className="form-control" value={musician.instrument} onChange = {changeHandler}/>
                    </div>
                    <button input type="submit" className='btn btn-warning'>Submit</button>
                </form>
            </div>
        </div>
    )
}
export default EditMusicianForm