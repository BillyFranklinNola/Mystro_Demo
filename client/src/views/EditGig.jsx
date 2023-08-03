import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import GigForm from '../components/GigForm'
import { toast } from 'react-toastify'
import '../styles/globals.css'


const EditGig = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [gig, setGig] = useState({});
    const [allGigs, setAllGigs] = useState([]);
    const [loaded, setLoaded] = useState(false);
    // const [errors, setErrors] = useState([]);

    useEffect(()=>{
        axios.get(`/api/gigs/${id}`)
        .then((res)=>{
            console.log(res);
            setGig(res.data.gig);
            setLoaded(true);
        })
        .catch((err)=>{
            console.log(err);
        })
        }, [id])

    const updateGig = async (gig) => {
        console.log(gig)
        const {venue, date, streetAddress, city, state, zipCode, setUpBy, startTime, endTime, notes, musicians} = gig;
        const gigData = {venue, date, streetAddress, city, state, zipCode, setUpBy, startTime, endTime, notes, musicians};
        try {
            const updatedGig = await axios.put(`/api/gigs/edit/${id}`, gigData) 
            const formData = new FormData();
            const gigId = updatedGig.data.gig._id;
            formData.append('iRealCharts', gig.iRealCharts);
            formData.append('pdfCharts', gig.pdfCharts);
            formData.append('timeline', gig.timeline);
            formData.append('gigId', gigId);
            
            axios.put(`/api/gigs/uploadCharts/${gigId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setGig(updatedGig.data)
            setAllGigs([...allGigs, updatedGig.data]);
            navigate('/AdminDashboard')
        } catch (err) {      
            console.log(err.response);
            const errorResponse = err.response.data.error;
            for (const key of Object.keys(errorResponse)) {
                toast.error(errorResponse[key].message)
            }
        };
}

    return (
        <div className='viewport container-fluid'>
            <h3 className="subNav mx-auto my-4">Edit Gig:</h3>
            <div className='mt-3'>
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
                    initialMusicians={gig.musicians} 
                    initialIRealCharts={gig.iRealCharts}
                    initialPdfCharts={gig.pdfCharts}
                    initialTimeline={gig.timeline}
                    gigId={gig._id}
                    />
                }
            </div>
        </div>
    )
}   

export default EditGig