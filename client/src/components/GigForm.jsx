import React, { useState, useEffect } from 'react'
import axios from 'axios';

const GigForm = (props) => {
    const {initialVenue, initialDate, initialstreetAddress, initialCity, initialState , initialZipCode, initialSetUpBy, initialStartTime, initialEndTime, initialMusicians, initialCharts, initialTimline, onSubmitProp} = props;
    const [gig, setGig] = useState({
        venue: initialVenue,
        date: initialDate,
        streetAddress: initialstreetAddress,
        city: initialCity,
        state: initialState,
        zipCode: initialZipCode,
        setUpBy: initialSetUpBy,
        startTime: initialStartTime,
        endTime: initialEndTime,
        musicians: initialMusicians,
        charts: initialCharts,
        timeline: initialTimline

    })
    const [errors, setErrors] = useState({})
    const [allMusicians, setAllMusicians] = useState([])

        useEffect(() => {
            axios.get('http://localhost:8000/api/musicians/list')
            .then((res)=>{
                console.log(res.data);
                setAllMusicians(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })}, [])

    const changeHandler = (e) => {
        if (e.target.type == "checkbox"){
            console.log(e.target.id)
            const musicianId = e.target.id;
            if (e.target.checked) {
                setGig(prevGig => {
                    const updatedMusicians = [...prevGig.musicians, musicianId];
                    console.log(gig.musicians)
                    return {
                        ...prevGig,
                        musicians: updatedMusicians
                    };
                });
            } else {
                setGig(prevGig => {
                    const updatedMusicians = prevGig.musicians.filter(musician => musician !== musicianId);
                    console.log(updatedMusicians)
                    return{
                        ...prevGig,
                        musicians: updatedMusicians,
                    };
                });
            }
        } else {
            setGig({...gig, [e.target.name]:e.target.value})
        }
        console.log(gig)
    }
    
    const onSubmitHandler = (e) => {
        e.preventDefault();
        onSubmitProp(gig)
    }

    return (
        <div className="col-4 bg-light mx-auto p-3 border border-dark rounded m-5">
            <form className='mx-auto' onSubmit={onSubmitHandler}>
                <div className='form-group m-3'>
                    <label htmlFor='venue'>Venue:</label>
                    <input type="text" name="venue" id="venue" className="form-control" value={gig.venue} onChange = {changeHandler}/>
                    {
                        errors.venue?
                        <p>{errors.venue.message}</p>:
                        null
                    }
                </div>
                <div className='form-group m-3'>
                    <label htmlFor='date'>Date:</label>
                    <input type="date" name="date" id="date" className="form-control" value={gig.date} onChange = {changeHandler}/>
                    {
                        errors.date?
                        <p>{errors.date.message}</p>:
                        null
                    }
                </div>
                <div className='form-group m-3'>
                    <label htmlFor='streetAddress'>Address:</label>
                    <input type="text" name="streetAddress" id="streetAddress" className="form-control" value={gig.streetAddress} onChange = {changeHandler}/>
                    {
                        errors.streetAddress?
                        <p>{errors.streetAddress.message}</p>:
                        null
                    }
                </div>
                <div className='form-group m-3'>
                    <label htmlFor='state'>State:</label>
                    <select name="state" id="state" className="form-control" value={gig.state} onChange = {changeHandler}>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </select>
                    {
                        errors.state?
                        <p>{errors.state.message}</p>:
                        null
                    }
                </div>
                <div className='form-group m-3'>
                    <label htmlFor='zipCode'>Zip Code:</label>
                    <input type="text" name="zipCode" id="zipCode" className="form-control" value={gig.zipCode} onChange = {changeHandler}/>
                    {
                        errors.zipCode?
                        <p>{errors.zipCode.message}</p>:
                        null
                    }
                </div>
                <div className='form-group m-3'>
                    <label htmlFor='setUpBy'>Set Up By:</label>
                    <input type="time" name="setUpBy" id="setUpBy" className="form-control" value={gig.setUpBy} onChange = {changeHandler}/>
                    {
                        errors.setUpBy?
                        <p>{errors.setUpBy.message}</p>:
                        null
                    }
                </div>
                <div className='form-group m-3'>
                    <label htmlFor='startTime'>Start Time:</label>
                    <input type="time" name="startTime" id="startTime" className="form-control" value={gig.startTime} onChange = {changeHandler}/>
                    {
                        errors.startTime?
                        <p>{errors.startTime.message}</p>:
                        null
                    }
                </div>
                <div className='form-group m-3'>
                    <label htmlFor='endTime'>End Time:</label>
                    <input type="time" name="endTime" id="endTime" className="form-control" value={gig.endTime} onChange = {changeHandler}/>
                    {
                        errors.endTime?
                        <p>{errors.endTime.message}</p>:
                        null
                    }
                </div>
                <div className='form-group m-3'>
                    <p>Musicians:</p>
                    {
                        allMusicians.map((musician,idx) => (
                                <div className='form-group' key={idx}>
                                    <label htmlFor={musician.id}>{musician.firstName} {musician.lastName}</label>
                                    <input type="checkbox" className="form-checkbox-input" name={musician.id} id={musician._id} onChange = {changeHandler}/>
                                </div>
                        ))
                    }
                    {
                        errors.musicians?
                        <p>{errors.musicians.message}</p>:
                        null
                    }
                </div>
                <div className='form-group m-3'>
                    <label htmlFor='charts'>Charts:</label>
                    <input type="file" name="charts" id="charts" multiple className="form-control" value={gig.charts} onChange = {changeHandler}/>
                    {
                        errors.charts?
                        <p>{errors.charts.message}</p>:
                        null
                    }
                </div>
                <div className='form-group m-3'>
                    <label htmlFor='timeline'>Charts:</label>
                    <input type="file" name="timeline" id="timeline" className="form-control" value={gig.timeline} onChange = {changeHandler}/>
                    {
                        errors.timeline?
                        <p>{errors.timeline.message}</p>:
                        null
                    }
                </div>
                <button input type="submit" className='btn btn-warning'>Submit</button>
            </form>
        </div>
    )
}
export default GigForm