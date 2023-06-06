import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const MusicianGigList = (props) => {
    const [allGigs, setAllGigs] = useState([])
    const [musicianGigs, setMusicianGigs] = useState([])

    useEffect((id) => {
        axios.get('http://localhost:8000/api/gigs/list')
        .then((res)=>{
            console.log(res.data);
            setAllGigs(res.data);
            setMusicianGigs(allGigs.filter(gig => gig.musicians._id === id))
        })
        .catch((err)=>{
            console.log(err);
        })}, [])

return (
    <div className='col-10 p-3 border border-dark rounded mx-auto p-5'>
        <table className='table table-striped border border-dark rounded mx-auto'>
            <thead>
                <tr>
                    <th scope='col' className='col-4 text-start'>Venue</th>
                    <th scope='col' className='text-start'>Date</th>
                    <th scope='col' className='text-start'>Location</th>
                    <th scope='col'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                musicianGigs.map((gig)=>{
                return(
                    <tr key={gig._id}>
                        <td className='text-start'>{gig.venue}</td>
                        <td className='text-start'>{gig.date}</td>
                        <td className='text-start'>{gig.city}, {gig.state}</td>
                        <td>
                            <div className='d-flex justify-content-around mx-auto'>
                                <Link className='btn btn-primary' to={`/gigs/viewGig/${gig._id}`}>View</Link>
                            </div>
                        </td>
                    </tr>
                    )
                })
                }
            </tbody>
        </table>
    </div>
)}

export default MusicianGigList