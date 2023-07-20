import React, { useEffect, useState } from 'react'

const EditMusicianForm = (props) => {
    const [musician, setMusician] = useState({});

    const {
        initialFirstName, 
        initialLastName, 
        initialEmail, 
        initialInstrument, 
        onSubmitProp
    } = props;

    useEffect(() => {
        setMusician({
            firstName: initialFirstName,
            lastName: initialLastName,
            email: initialEmail,
            instrument: initialInstrument,
    })}, [initialFirstName, initialLastName, initialEmail, initialInstrument])

    const changeHandler = async (e) => {
        setMusician({...musician, [e.target.name]:e.target.value})
        console.log(musician)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        onSubmitProp(musician)
    }

    return (
        <div className='container pb-5'>
            <div className="col-12 col-md-8 col-lg-6 panelBackground text-white mx-auto p-3 border border-2 border-secondary rounded">
                <form className='mx-auto' onSubmit={onSubmitHandler}>
                    <div className='row form-group align-items-center mt-3'>
                        <label htmlFor='firstName' className='col-4 col-lg-3 col-form-label me-2'>First Name:</label>
                        <div className='col-7 col-lg-8'>
                            <input type="text" name="firstName" id="firstName" className="form-control" value={musician.firstName} onChange = {changeHandler}/>
                        </div>
                    </div>
                    <div className='row form-group align-items-center mt-4'>
                        <label htmlFor='lastName' className='col-4 col-lg-3 col-form-label me-2'>Last Name:</label>
                        <div className='col-7 col-lg-8'>
                            <input type="text" name="lastName" id="lastName" className="form-control" value={musician.lastName} onChange = {changeHandler}/>
                        </div>
                    </div>
                    <div className='row form-group align-items-center mt-4'>
                        <label htmlFor='email' className='col-4 col-lg-3 col-form-label me-2'>Email:</label>
                        <div className='col-7 col-lg-8'>
                            <input type="text" name="email" id="email" className="form-control" value={musician.email} onChange = {changeHandler}/>
                        </div>
                    </div>
                    <div className='row form-group align-items-center mt-4'>
                        <label htmlFor='instrument' className='col-4 col-lg-3 col-form-label me-2'>Instrument:</label>
                        <div className='col-7 col-lg-8'>
                            <input type="text" name="instrument" id="instrument" className="form-control" value={musician.instrument} onChange = {changeHandler}/>
                        </div>
                    </div>
                    <button input type="submit" className='btn btn-warning mt-5 mb-4'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default EditMusicianForm