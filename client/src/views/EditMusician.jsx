import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import EditMusicianForm from '../components/EditMusicianForm'
import { toast } from 'react-toastify'
import '../styles/globals.css'


const EditMusician = (props) => {
    const [musician, setMusician] = useState(props);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const{id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/musicians/${id}`)
        .then((res)=>{
            setMusician(res.data.musician);
        })
        .catch((err)=>{
            console.log(err);
        })
        }, [])

    const updateMusician = async (musician) => {
        console.log(musician);
        try {
            const res = await axios.put(`http://localhost:8000/api/musicians/edit/${id}`, musician)
            console.log(res);
            setMusician(res.data);
            navigate(`/AdminDashboard/`)
        } catch (err) {
            console.log(err.response.data.err.errors);
            const errorResponse = err.response.data.err.errors;
            const errorArray = [];
            console.log(errorArray);
            for (const key of Object.keys(errorResponse)) {
                {errorArray.push(errorResponse[key].message)}
                toast.error(errorResponse[key].message)
            }
            setErrors(errorArray);
        }   
    }

    return (
        <div className='viewport container-fluid'>
            <h3 className="subNav mx-auto my-4">Edit Musician:</h3>
            <div className='mt-3'>
                <EditMusicianForm
                    onSubmitProp={updateMusician}
                    initialFirstName={musician.firstName}
                    initialLastName={musician.lastName}
                    initialEmail={musician.email}
                    initialInstrument={musician.instrument}
                    initialSongList=""/>
            </div>
        </div>
    )
}   

export default EditMusician