import React, {useEffect, useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import axios from 'axios'
import GigDeleteButton from './GigDeleteButton'

const AdminGigList = (props) => {
    const [allGigs, setAllGigs] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:8000/api/gigs/gigList', {withCredentials: true})
        .then((res)=>{
            console.log(res.data);
            setAllGigs(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })}, [])
        
    const deleteGig = (id) => {
        axios.delete(`http://localhost:8000/api/gigs/deleteGig/${id}`, {withCredentials: true})
        .then((res)=>{
            console.log(res);
            setAllGigs(allGigs.filter((gig) => gig._id !== id))
            navigate('/AdminDashboard')
        })
        .catch((err)=>{
            console.log(err);
        })
    }

return (
    <div className='container-fluid'>
        <div className='table-responsive border border-3 border-secondary rounded mx-auto p-5'>
            <table className='table table-striped border border-3 border-secondary rounded'>
                <thead>
                    <tr>
                        <th scope='col' className='text-start text-white'>Venue</th>
                        <th scope='col' className='text-start text-white'>Date</th>
                        <th scope='col' className='text-start text-white'>Location</th>
                        <th scope='col'className='text-white'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    allGigs.map((gig)=>{
                    return(
                        <tr key={gig._id}>
                            <td className='text-start text-white'>{gig.venue}</td>
                            <td className='text-start text-white'>{gig.date}</td>
                            <td className='text-start text-white'>{gig.city}, {gig.state}</td>
                            <td>
                                <div className='d-flex justify-content-around mx-auto'>
                                    <Link className='btn btn-warning me-1' to={`/gigs/viewGig/${gig._id}`}>View</Link>
                                    <Link className='btn btn-warning me-1' to={`/gigs/editGig/${gig._id}`}>Edit</Link>
                                    <GigDeleteButton className='btn btn-dark' id={gig._id} successCallback={()=>deleteGig(gig._id)}/>
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

export default AdminGigList