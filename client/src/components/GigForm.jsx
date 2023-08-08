import React, { useState, useEffect } from 'react'
import axios from 'axios';

const GigForm = (props) => {
    const {
        initialVenue, 
        initialDate, 
        initialStreetAddress, 
        initialCity, 
        initialState , 
        initialZipCode, 
        initialBandName,
        initialSetUpBy, 
        initialStartTime, 
        initialEndTime, 
        initialNotes,
        initialMusicians, 
        initialIRealCharts, 
        initialPdfCharts,
        initialTimeline, 
        onSubmitProp
    } = props;
    
    const [gig, setGig] = useState({
        venue: initialVenue,
        date: initialDate,
        streetAddress: initialStreetAddress,
        city: initialCity,
        state: initialState,
        zipCode: initialZipCode,
        bandName: initialBandName,
        setUpBy: initialSetUpBy,
        startTime: initialStartTime,
        endTime: initialEndTime,
        notes: initialNotes,
        musicians: initialMusicians,
        iRealCharts: initialIRealCharts,
        pdfCharts: initialPdfCharts,
        timeline: initialTimeline
    })

    const [allMusicians, setAllMusicians] = useState([])
    const [image, setImage] = useState('')

    useEffect(() => {
        axios.get('/api/musicians')
        .then((res)=>{
            setAllMusicians(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })}, [])

    function previewFile(timelineFile) {
        const reader = new FileReader();
        reader.readAsDataURL(timelineFile);
        reader.onloadend = () => {
            setImage(reader.result);
        };
    }

    const changeHandler = async (e) => {
        try{
            if (e.target.type === "checkbox"){
                const musicianId = e.target.id;
                console.log(gig.musicians);
                const musicianExists = gig.musicians.some((m) => m.musician._id === musicianId);
                if (musicianExists) {
                    setGig((prevGig) => ({
                        ...prevGig,
                        musicians: prevGig.musicians.filter((m) => m.musician._id !== musicianId)
                    }));
                } else { 
                    try {
                        const res = await axios.get(
                            `/api/musicians/${musicianId}`
                        );
                        const musicianData = res.data;
                        setGig((prevGig) => ({
                                ...prevGig,
                                musicians: [...prevGig.musicians, musicianData],
                            }));
                    } catch (err) {         
                        console.log(err);
                    }
                }
            } else if (e.target.type === "file") {
                const file = e.target.files[0];
                const fieldName = e.target.name;            
                    if (fieldName === "iRealCharts") {
                        setGig({...gig, iRealCharts: file});
                    } else if (fieldName === "pdfCharts") {
                        setGig({...gig, pdfCharts: file});
                    } else if (fieldName === "timeline") {
                        setGig({...gig, timeline: file});
                        previewFile(file);
                    }
                } else {
                setGig((prevGig) => ({
                    ...prevGig,
                    [e.target.name]: e.target.value
                }));
            }
            } catch (err) {
                console.log(err);
                }
            console.log(gig)
            };

            const onSubmitHandler = (e) => {
                e.preventDefault();
                onSubmitProp(gig)
            }

    return (
        <div className="container">
            <div className="col-12 col-lg-10 panelBackground text-white mx-auto p-2 p-lg-5 border border-2 border-dark rounded">
                <form className='mx-auto' onSubmit={onSubmitHandler}>
                    <div className='row mx-auto'>
                        <div className='col-12 col-lg-7'>
                            <div className='row form-group align-items-center mt-5 mt-lg-0'>
                                <label htmlFor='venue' className='col-3 col-lg-2 col-form-label me-2'>Venue:</label>
                                <div className='col-8 col-lg-9'>
                                    <input type="text" name="venue" id="venue" className="form-control" value={gig.venue} onChange = {changeHandler}/>
                                </div>
                            </div>
                            <div className='row form-group align-items-center mt-4'>
                                <label htmlFor='streetAddress' className='col-3 col-lg-2 col-form-label me-2'>Address:</label>
                                <div className='col-8 col-lg-9'>
                                    <input type="text" name="streetAddress" id="streetAddress" className="form-control" value={gig.streetAddress} onChange = {changeHandler}/>
                                </div>
                            </div>
                            <div className='row form-group align-items-center mt-4'>
                                <label htmlFor='city' className='col-3 col-lg-2 col-form-label me-2'>City:</label>
                                <div className='col-8 col-lg-9'>
                                    <input type="text" name="city" id="city" className="form-control" value={gig.city} onChange = {changeHandler}/>
                                </div>
                            </div>
                            <div className='row form-group align-items-center mt-4'>
                                <label htmlFor='state' className='col-3 col-lg-2 col-form-label me-2'>State:</label>
                                <div className='col-8 col-lg-9'>
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
                                </div>
                            </div>
                            <div className='row form-group align-items-center mt-4'>
                                <label htmlFor='zipCode' className='col-3 col-lg-2 col-form-label me-2'>Zip:</label>
                                <div className='col-8 col-lg-9'>
                                    <input type="text" name="zipCode" id="zipCode" className="form-control" value={gig.zipCode} onChange = {changeHandler}/>
                                </div>
                            </div>
                            <div className='row form-group align-items-center mt-4'>
                                <label htmlFor='bandName' className='col-3 col-lg-2 col-form-label me-2'>Band:</label>
                                <div className='col-8 col-lg-9'>
                                    <input type="text" name="bandName" id="bandName" className="form-control" value={gig.bandName} onChange = {changeHandler}/>
                                </div>
                            </div>
                            <div className='row form-group align-items-center mt-4'>
                                <label htmlFor='date' className='col-3 col-lg-2 col-form-label me-2'>Date:</label>
                                <div className='col-8 col-lg-9'>
                                    <input type="date" name="date" id="date" className="form-control" value={gig.date} onChange = {changeHandler}/>
                                </div>
                            </div>
                            <div className='row form-group align-items-center mt-4'>
                                <label htmlFor='setUpBy' className='col-4 col-lg-3 col-form-label me-2'>Set Up By:</label>
                                <div className='col-7 col-lg-8'>
                                    <input type="time" name="setUpBy" id="setUpBy" className="form-control" value={gig.setUpBy} onChange = {changeHandler}/>
                                </div>
                            </div>
                            <div className='row form-group align-items-center mt-4'>
                                <label htmlFor='startTime' className='col-4 col-lg-3 col-form-label me-2'>Start Time:</label>
                                <div className='col-7 col-lg-8'>
                                    <input type="time" name="startTime" id="startTime" className="form-control" value={gig.startTime} onChange = {changeHandler}/>
                                </div>
                            </div>
                            <div className='row form-group align-items-center mt-4'>
                                <label htmlFor='endTime' className='col-4 col-lg-3 col-form-label me-2'>End Time:</label>
                                <div className='col-7 col-lg-8'>
                                    <input type="time" name="endTime" id="endTime" className="form-control" value={gig.endTime} onChange = {changeHandler}/>
                                </div>
                            </div>
                            <div className='row form-group align-items-center mt-4'>
                                <label htmlFor='notes' className='col-4 col-lg-3 col-form-label me-2'>Additional Info:</label>
                                <div className='col-7 col-lg-8'>
                                    <textarea name="notes" id="notes" className="form-control" value={gig.notes} onChange = {changeHandler}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-lg-5'>
                            <div className='form-group mt-5 mt-lg-0 ms-lg-0'>
                                <p className='mb-4'>Musicians:</p>
                                {
                                allMusicians.map((musician,idx) => (
                                        <div className='form-check text-start' key={idx}>
                                            <label htmlFor={musician.id} className='form-check-label ms-1'>{musician.firstName} {musician.lastName}</label>
                                            <input 
                                                type="checkbox" 
                                                className="form-check-input" 
                                                name={musician.id} id={musician._id} 
                                                checked={gig.musicians.length > 0 ? gig.musicians.some((m) => m.musician._id === musician._id):false}
                                                onChange = {changeHandler}/>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='form-group mt-5 mt-lg-4 '>
                                <label htmlFor='iRealCharts'>iRealpro Charts:</label>
                                <input type="file" accept=".html" name="iRealCharts" id="iRealCharts" className="form-control mt-3 mt-lg-2" onChange = {changeHandler}/>
                            </div>
                            <div className='form-group mt-4'>
                                <label htmlFor='pdfCharts'>PDF Charts:</label>
                                <input type="file" accept=".zip, .pdf" name="pdfCharts" id="pdfCharts" className="form-control mt-3 mt-lg-2" onChange = {changeHandler}/>
                            </div>
                            <div className='form-group mt-4'>
                                <label htmlFor='timeline'>Timeline:</label>
                                <input type="file" accept=".png, .jpg, .jpeg, .pdf" name="timeline" id="timeline" className="form-control mt-3 mt-lg-2" onChange = {changeHandler}/>
                                {
                                image === '' ? 
                                null : 
                                <img src={image} className='h-75 w-75 mt-4 border border-2 rounded p-3' alt="Preview of uploaded file." />
                                }
                            </div>
                        </div>    
                    </div>
                    <button input type="submit" className='btn btn-warning mt-5 mb-5 mb-lg-0'>Submit</button>
                </form>
            </div>
        </div>
    )
}
export default GigForm