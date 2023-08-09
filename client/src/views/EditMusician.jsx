import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import EditMusicianForm from '../components/EditMusicianForm'
import { toast } from 'react-toastify'
import '../styles/globals.css'


const EditMusician = (props) => {
    const [musician, setMusician] = useState(props);
    const navigate = useNavigate();
    const{id} = useParams();

    useEffect(()=>{
        axios.get(`/api/musicians/${id}`)
        .then((res)=>{
            setMusician(res.data.musician);
        })
        .catch((err)=>{
            console.log(err);
        })
        }, [id])

    const updateMusician = async (musician) => {
        console.log(musician);
        try {
            const res = await axios.put(`/api/musicians/edit/${id}`, musician)
            console.log(res);
            setMusician(res.data);
            navigate(`/AdminDashboard/`)
        } catch (err) {
            console.log(err.response);
            const errorResponse = err.response.data.errors;
            for (const key of Object.keys(errorResponse)) {
                toast.error(errorResponse[key].message)
            }
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