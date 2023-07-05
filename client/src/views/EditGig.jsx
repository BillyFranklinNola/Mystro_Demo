import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import GigForm from '../components/GigForm'
import NavBar from '../components/NavBar'
import { toast } from 'react-toastify'

const EditGig = (props) => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [gig, setGig] = useState(props);
    const [errors, setErrors] = useState([]);
    const [loaded, setLoaded] = useState(false);

    console.log(gig);

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/gigs/oneGig/${id}`)
        .then((res)=>{
            console.log(res);
            setGig(res.data.gig);
            setLoaded(true);

        })
        .catch((err)=>{
            console.log(err);
        })
        }, [])

    const updateGig = gig => {
        axios.put(`http://localhost:8000/api/gigs/editGig/${id}`, 
        gig)
        .then(res=>{
            console.log(res);
            navigate(`/AdminDashboard`)
        })
        .catch(err=>{
            console.log(err.response.data.error);
            const errorResponse = err.response.data.error;
            const errorArray = [];
            for (const key of Object.keys(errorResponse)) {
                {errorArray.push(errorResponse[key].message)}
                toast.error(errorResponse[key].message)
            }
            setErrors(errorArray);
        });
}

return (
    <div style={{
        background: 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(0,107,141,1) 0%, rgba(0,69,91,1) 90%)',
    }}>
        <div className='pt-3'>
            <NavBar/>
            <h2 className="text-warning mx-auto mt-5">Edit Gig:</h2>
            <div>
                {errors.map((err, index) => <p className='text-danger' key={index}>{err}</p>)}
                {
                loaded && <GigForm 
                    onSubmitProp={updateGig}
                    initialVenue={gig.venue}
                    initialDate={gig.date}
                    initialStreetAddress={gig.streetAddress}
                    initialCity={gig.city}
                    initialState={gig.state}
                    initialZipCode={gig.zipCode}
                    initialSetUpBy={gig.setUpBy}
                    initialStartTime={gig.startTime}
                    initialEndTime={gig.endTime}
                    initialMusicians={gig.musicians} />
                }
            </div>
        </div>
    </div>
    )
}   

export default EditGig