import React, { useState } from 'react'

const LoginForm = (props) => {
    const {loginEmail, loginPassword, onSubmitProp} = props;
    const [loginInfo, setLoginInfo] = useState({
        email: loginEmail,
        password: loginPassword,
    })
    const [errors, setErrors] = useState({})

    const logChangeHandler = (e) => {
        setLoginInfo({...loginInfo, [e.target.name]:e.target.value})
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        onSubmitProp(loginInfo)
    }

    return (
        <div className="col-4 bg-light mx-auto p-3 border border-dark rounded m-5">
            <form className='mx-auto' onSubmit={onSubmitHandler}>
                <div className='form-group m-3'>
                    <label htmlFor='email'>Email:</label>
                    <input type="text" name="email" id="email" className="form-control" onChange = {logChangeHandler}/>
                    {
                        errors.email?
                        <p>{errors.email.message}</p>:
                        null
                    }
                </div>
                <div className='form-group m-3'>
                    <label htmlFor='password'>Password:</label>
                    <input type="text" name="password" id="password" className="form-control" onChange = {logChangeHandler}/>
                    {
                        errors.password?
                        <p>{errors.password.message}</p>:
                        null
                    }
                </div>
                
                <button input type="submit" className='btn btn-warning'>Submit</button>
            </form>
        </div>
    )
}
export default LoginForm