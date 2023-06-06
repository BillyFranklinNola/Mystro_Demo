import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import EditMusicianForm from '../components/EditMusicianForm'

const EditMusician = (props) => {
    const [musician, setMusician] = useState(props);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const{id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/musicians/oneMusician/${id}`)
        .then((res)=>{
            console.log(res.data.musician);
            setMusician(res.data.musician);
        })
        .catch((err)=>{
            console.log(err);
        })
        }, [])

    const updateMusician = musician => {
        axios.put(`http://localhost:8000/api/musicians/editMusician/${id}`, 
        musician)
        .then(res=>{
            console.log(res);
            navigate(`/AdminDashboard/`)
        })
        .catch(err=>{
            console.log(err.response.data.errors);
            const errorResponse = err.response.data.errors;
            const errorArray = [];
            for (const key of Object.keys(errorResponse)) 
                {errorArray.push(errorResponse[key].message)}
            setErrors(errorArray);
        });
    }

return (
    <div>
        {errors.map((err, index) => <p className='text-danger' key={index}>{err}</p>)}
        <EditMusicianForm onSubmitProp={updateMusician} initialFirstName={musician.firstName} initialLastName={musician.lastName} initialEmail={musician.email} initialInstrument={musician.instrument} initialSongList=""/>
    </div>
    )
}   

export default EditMusician