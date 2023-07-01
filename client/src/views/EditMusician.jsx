import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import EditMusicianForm from '../components/EditMusicianForm'
import NavBar from '../components/NavBar'

const EditMusician = (props) => {
    const [musician, setMusician] = useState(props);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const{id} = useParams();
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/musicians/oneMusician/${id}`)
        .then((res)=>{
            console.log(res.data.musician);
            setMusician(res.data.musician);
            setLoaded(true);
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
    <div style={{
        background: 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(0,107,141,1) 0%, rgba(0,69,91,1) 90%)',
    }}>
        <div className='pt-3'>
            <NavBar/>
            <h2 className="text-warning mx-auto mt-5">Edit Musician:</h2>
            <div>
                {errors.map((err, index) => <p className='text-danger' key={index}>{err}</p>)}
                {
                loaded &&<EditMusicianForm
                    onSubmitProp={updateMusician}
                    initialFirstName={musician.firstName}
                    initialLastName={musician.lastName}
                    initialEmail={musician.email}
                    initialInstrument={musician.instrument}
                    initialSongList=""/>
                }           
            </div>
        </div>
    </div>)
}   

export default EditMusician