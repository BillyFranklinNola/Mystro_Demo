import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import GigForm from '../components/GigForm'
import NavBar from '../components/NavBar'

const CreateGig = (props) => {
    const [allGigs, setAllGigs] = useState([]);
    const [gig, setGig] = useState(props);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    
    const createGig = async (gig) => {   
        console.log(gig) 
        console.log(gig.musicians)
        const formData = new FormData();
        formData.append('venue', gig.venue);
        formData.append('date', gig.date);
        formData.append('streetAddress', gig.streetAddress);
        formData.append('city', gig.city);
        formData.append('state', gig.state);
        formData.append('zipCode', gig.zipCode);
        formData.append('setUpBy', gig.setUpBy);
        formData.append('startTime', gig.startTime);
        formData.append('endTime', gig.endTime);
        gig.musicians.forEach((musician, index) => {
            formData.append(`musicians[${index}]`, musician);
        });
        formData.append('charts', gig.charts);
        formData.append('timeline', gig.timeline);
        try{
            
            const res = await axios.post('http://localhost:8000/api/gigs/createGig', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                    });
                console.log(res);
                setGig(res.data)
                setAllGigs([...allGigs, res.data]);
                navigate('/AdminDashboard')
            } catch (err) {
                console.log(err)
                const errorResponse = err.response.data.message;
                const errorArray = [];
                for (const key of Object.keys(errorResponse)) 
                    {errorArray.push(errorResponse[key].message)}
                setErrors(errorArray);
            }
    };

return (
    <div style={{
        background: 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(0,107,141,1) 0%, rgba(0,69,91,1) 90%)'
    }}>
        <div className='pt-3'>
            <NavBar/>
            <h2 className="text-warning mx-auto mt-5">Create a new gig:</h2>
            <div>
                {errors.map((err, index) => <p className='text-danger' key={index}>{err}</p>)}
                <GigForm
                    onSubmitProp={createGig} 
                    initialVenue="" 
                    initialDate="" 
                    initialStreetAddress="" 
                    initialCity="" 
                    initialState=""  
                    initialZipCode="" 
                    initialSetUpBy="" 
                    initialStartTime="" 
                    initialEndTime=""  
                    initialMusicians={[]} 
                    initialCharts="" 
                    initialTimeline=""/>
            </div>
        </div>
    </div>
    )
}   

export default CreateGig