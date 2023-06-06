import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import GigForm from '../components/GigForm'

const EditGig = (props) => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [gig, setGig] = useState(props);
    const [errors, setErrors] = useState([]);
    const [loaded, setLoaded] = useState(false);

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
        {
        loaded &&<GigForm onSubmitProp={updateGig} initialVenue={gig.venue} initialDate={gig.date} initialStreetAddress={gig.streetAddress} initialCity={gig.city} initialState={gig.state}  initialZipCode={gig.zipCode} initialSetUpBy={gig.setUpBy} initialstartTime={gig.startTime} initialEndTime={gig.endTime}  initialMusicians={gig.musicians} initialCharts={gig.charts} initialTimeline={gig.timeline}/>
        }
        </div>
    )
}   

export default EditGig