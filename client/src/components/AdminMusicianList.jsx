import React, {useEffect, useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import axios from 'axios'
import MusicianDeleteButton from './MusicianDeleteButton'

const AdminMusicianList = (props) => {
    const [allMusicians, setAllMusicians] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/musicians')
        .then((res)=>{
            setAllMusicians(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })}, [])
        
    const deleteMusician = (id) => {
        axios.delete(`/api/musicians/delete/${id}`)
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
    <div className='table-responsive' style={{'borderRadius': '5px'}}>
        <table className='table panelBackground border border-2 border-dark rounded'>
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
                            <div className='d-flex flex-column flex-lg-row justify-content-around mx-auto'>
                                <Link className='btn btn-warning me-lg-1 mb-1 mb-lg-0' to={`/musicians/editMusician/${musician._id}`}>Edit</Link>
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
)}

export default AdminMusicianList