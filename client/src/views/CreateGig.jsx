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
    const [chartsFile, setChartsFile] = useState(null);
    const [timelineFile, setTimelineFile] = useState(null);
    
    const createGig = async (gig) => {    
        try{
            // if(chartsFile){
            //     const chartsResult = await axios.post('http://localhost:8000/api/fileUpload', {chartsFile: chartsFile});
            //     gig.charts = chartsResult.data.public_id;
            //     setChartsFile(chartsResult.data.public_id);

            // }
            // if(timelineFile){
            //     const timelineResult = await axios.post('http://localhost:8000/api/fileUpload', {timelineFile: timelineFile});
            //     gig.timeline = timelineResult.data.public_id;
            //     setTimelineFile(timelineResult.data.public_id);
            // }
            const res = await axios.post('http://localhost:8000/api/gigs/createGig', gig)
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
                    initialMusicians="" 
                    initialCharts="" 
                    initialTimeline=""/>
            </div>
        </div>
    </div>
    )
}   

export default CreateGig