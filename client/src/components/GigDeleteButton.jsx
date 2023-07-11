import React from 'react'
import axios from 'axios';

const DeleteButton = (props) => {
    const { id, successCallback } = props;
    const deleteGig = () => {
        
        axios.delete(`http://localhost:8000/api/gigs/delete/${id}`)
            .then(res=>{
                successCallback();
            })
    }
    return (
        <button onClick={deleteGig} className='btn btn-secondary'>
            Delete
        </button>
    )
}
export default DeleteButton;