import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'
import '../styles/globals.css';

const MusicianGigList = () => {
    const [allGigs, setAllGigs] = useState([])
    const [musicianGigs, setMusicianGigs] = useState([])
    const {id} = useParams()

    useEffect(() => {
        axios.get('/api/gigs')
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
    }, [allGigs, id]);


    const formatDate = (date) => {
        if (date) {
            const [year, month, day] = date.split("-");
            const formattedDate = new Date();
            formattedDate.setFullYear(year);
            formattedDate.setMonth(month - 1);
            formattedDate.setDate(day);

            return formattedDate.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            });
        }
        return "";
    };

    

return (
    <div className='table-responsive' style={{'borderRadius':'5px'}}>
        <table className='table panelBackground border border-2 border-dark text-white mx-auto'>
            <thead>
                <tr>
                    <th scope='col' className='text-start text-white'>Band</th>
                    <th scope='col' className='col-4 text-start text-white'>Venue</th>
                    <th scope='col' className='text-start text-white'>Date</th>
                    <th scope='col' className='text-white'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                musicianGigs.map((gig)=>{
                return(
                    <tr key={gig._id}>
                        <td className='text-start text-white'>{gig.bandName}</td>
                        <td className='text-start text-white'>{gig.venue}</td>
                        <td className='text-start text-white'>{formatDate(gig.date)}</td>
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
)}

export default MusicianGigList