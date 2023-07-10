import React, {useEffect, useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import axios from 'axios'
import MusicianDeleteButton from './MusicianDeleteButton'

const AdminMusicianList = (props) => {
    const [allMusicians, setAllMusicians] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/musicians/list')
        .then((res)=>{
            console.log(res.data);
            setAllMusicians(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })}, [])
        
    const deleteMusician = (id) => {
        axios.delete(`http://localhost:8000/api/musicians/deleteMusician/${id}`)
        .then((res)=>{
            console.log(res);
            setAllMusicians(allMusicians.filter((musician) => musician._id !== id))
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
                        <th scope='col' className='text-start text-white'>Name</th>
                        <th scope='col' className='text-start text-white'>Instrument</th>
                        <th scope='col' className='text-white'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    allMusicians.map((musician)=>{
                    return(
                        <tr key={musician._id}>
                            <td className='text-start text-white'>{musician.firstName} {musician.lastName}</td>
                            <td className='text-start text-white'>{musician.instrument}</td>
                            <td>
                                <div className='d-flex justify-content-around mx-auto'>
                                    <Link className='btn btn-warning me-1' to={`/musicians/editMusician/${musician._id}`}>Edit</Link>
                                    <MusicianDeleteButton className='btn btn-secondary' id={musician._id} successCallback={()=>deleteMusician(musician._id)}/>
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

export default AdminMusicianList