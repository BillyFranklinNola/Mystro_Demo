import React from 'react'
import axios from 'axios';

const DeleteButton = (props) => {
    const { id, successCallback } = props;
    const deleteMusician = () => {
        
        axios.delete(`http://localhost:8000/api/players/deleteMusician/${id}`)
            .then(res=>{
                successCallback();
            })
    }
    return (
        <button onClick={deleteMusician} className='btn btn-danger'>
            Delete
        </button>
    )
}
export default DeleteButton;