import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import GigForm from '../components/GigForm'

const CreateGig = (props) => {
    const [allGigs, setAllGigs] = useState([]);
    const [gig, setGig] = useState(props);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();


    const createGig = gig => {    
        axios.post('http://localhost:8000/api/gigs/createGig', gig)
                .then(res=>{
                    console.log(res);
                    setGig(res.data)
                    setAllGigs([...allGigs, res.data]);
                    navigate('/AdminDashboard')
                })
                .catch(err=>{
                    console.log(err)
                    const errorResponse = err.response.data.message;
                    const errorArray = [];
                    for (const key of Object.keys(errorResponse)) 
                        {errorArray.push(errorResponse[key].message)}
                    setErrors(errorArray);
                });
}

return (
    <div>
        {errors.map((err, index) => <p className='text-danger' key={index}>{err}</p>)}
        <GigForm onSubmitProp={createGig} initialVenue="" initialDate="" initialStreetAddress="" initialCity="" initialState=""  initialZipCode="" initialSetUpBy="" initialstartTime="" initialEndTime=""  initialMusicians="" initialCharts="" initialTimeline=""/>
    </div>
    )
}   

export default CreateGig