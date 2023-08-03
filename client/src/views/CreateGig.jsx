import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import GigForm from '../components/GigForm'
import { toast } from 'react-toastify';


const CreateGig = () => {
    const navigate = useNavigate();
    const [gig, setGig] = useState({});
    const [allGigs, setAllGigs] = useState([]);

    const newGig = async (gig) => {   
        const {venue, date, streetAddress, city, state, zipCode, setUpBy, startTime, endTime, notes, musicians} = gig;
        const gigData = {venue, date, streetAddress, city, state, zipCode, setUpBy, startTime, endTime, notes, musicians};
        try {
            const newGig = await axios.post('/api/gigs/create', gigData)
            const formData = new FormData();
            formData.append('iRealCharts', gig.iRealCharts);
            formData.append('pdfCharts', gig.pdfCharts);
            formData.append('timeline', gig.timeline);
            formData.append('gigId', newGig.data._id);

            axios.put(`/api/gigs/uploadCharts/${newGig.data._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setGig(newGig.data)
            setAllGigs([...allGigs, newGig.data]);
            navigate('/AdminDashboard')
        } catch (err) {
            console.log(err.response.data.error.errors)
            const errorResponse = err.response.data.error.errors;
            for (const key of Object.keys(errorResponse)) {
                toast.error(errorResponse[key].message)
        }
    }
}

    return (
        <div className='viewport container-fluid pb-5'>
            <h3 className="subNav my-4">Create a new gig:</h3>
            <div className='mt-3'>
                <GigForm
                    onSubmitProp={newGig} 
                    initialVenue="" 
                    initialDate="" 
                    initialStreetAddress="" 
                    initialCity="" 
                    initialState=""  
                    initialZipCode="" 
                    initialSetUpBy="" 
                    initialStartTime="" 
                    initialEndTime=""  
                    initialNotes=""
                    initialMusicians={[]}
                    initialIRealCharts="" 
                    initialPdfCharts=""
                    initialTimeline=""/>
            </div>
        </div>
    )
}   

export default CreateGig