import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'
import { setHeaders } from '../slices/setHeaders'
import Cookies from 'js-cookie';


const MusicianGigList = (props) => {
    const [allGigs, setAllGigs] = useState([])
    const [musicianGigs, setMusicianGigs] = useState([])
    const {id} = useParams()
    const [loggedInMusician, setLoggedInMusician] = useState({})
    const token = Cookies.get('token');

    console.log(token)

    useEffect(() => {
        axios.get('http://localhost:8000/api/gigs/gigList', {withCredentials: true, ...setHeaders(token)})
        .then((res)=>{
            setAllGigs(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })}, []);


    useEffect(() => {
        const filteredGigs = allGigs.filter((gig) =>
            gig.musicians.some((musician) => musician._id === id)
        );
        setMusicianGigs(filteredGigs);
        console.log(musicianGigs)
    }, [allGigs, id]);

return (
    <div className='p-5'>
        <div className='p-3 border border-3 border-secondary rounded mx-auto p-5'>
            <table className='table table-striped border border-secondary rounded'>
                <thead>
                    <tr>
                        <th scope='col' className='col-4 text-start text-white'>Venue</th>
                        <th scope='col' className='text-start text-white'>Date</th>
                        <th scope='col' className='text-start text-white'>Location</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    musicianGigs.map((gig)=>{
                    return(
                        <tr key={gig._id}>
                            <td className='text-start text-white'>{gig.venue}</td>
                            <td className='text-start text-white'>{gig.date}</td>
                            <td className='text-start text-white'>{gig.city}, {gig.state}</td>
                            <td>
                                <div className='d-flex justify-content-around mx-auto'>
                                    <Link className='btn btn-warning' to={`/gigs/viewGig/${gig._id}`}>View</Link>
                                </div>
                            </td>
                        </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    </div>
)}

export default MusicianGigList