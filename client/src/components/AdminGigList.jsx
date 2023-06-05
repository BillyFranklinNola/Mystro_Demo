import React, {useEffect, useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import axios from 'axios'
import DeleteButton from './DeleteButton'

const AdminGigList = (props) => {
    const [allGigs, setAllGigs] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:8000/api/gigs/list')
        .then((res)=>{
            console.log(res.data);
            setAllGigs(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })}, [])
        
    const deleteGig = (id) => {
        axios.delete(`http://localhost:8000/api/players/deleteGig/${id}`)
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
                allGigs.map((gig)=>{
                return(
                    <tr key={gig._id}>
                        <td className='text-start'>{gig.venue}</td>
                        <td className='text-start'>{gig.date}</td>
                        <td className='text-start'>{gig.city}, {gig.state}</td>
                        <td>
                            <div className='d-flex justify-content-around mx-auto'>
                                <Link className='btn btn-primary' to={`/musicians/editMusician/${gig._id}`}>Edit</Link>
                                <DeleteButton className='btn btn-danger' id={gig._id} successCallback={()=>deleteGig(gig._id)}/>
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

export default AdminGigList