import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import EditMusicianForm from '../components/EditMusicianForm'
import NavBar from '../components/NavBar'
import { toast } from 'react-toastify'

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

    const updateMusician = async (musician) => {
        try {
            const res = axios.patch(`http://localhost:8000/api/musicians/editMusician/${id}`, musician)
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
    <div style={{
        background: 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(0,107,141,1) 0%, rgba(0,69,91,1) 90%)',
        minHeight: "100vh"
    }}>
        <div className='pt-3'>
            <NavBar/>
            <div className='container-fluid'>
                <h2 className="text-warning mx-auto mt-5">Edit Musician:</h2>
                <div>
                    <EditMusicianForm
                        onSubmitProp={updateMusician}
                        initialFirstName={musician.firstName}
                        initialLastName={musician.lastName}
                        initialEmail={musician.email}
                        initialInstrument={musician.instrument}
                        initialSongList=""/>
                </div>
            </div>
        </div>
    </div>)
}   

export default EditMusician