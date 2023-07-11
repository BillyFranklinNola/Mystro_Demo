import React from 'react'
import axios from 'axios';

const MusicianDeleteButton = (props) => {
    const { id, successCallback } = props;
    const deleteMusician = () => {
        
        axios.delete(`http://localhost:8000/api/musicians/delete/${id}`)
            .then(res=>{
                successCallback();
            })
    }
    return (
        <button onClick={deleteMusician} className='btn btn-secondary'>
            Delete
        </button>
    )
}
export default MusicianDeleteButton;