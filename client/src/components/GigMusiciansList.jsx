import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'

const GigMusiciansList = () => {
    const [gigMusicians, setGigMusicians] = useState([])
    const {id} = useParams()

    useEffect(() => {
        axios.get(`/api/gigs/${id}`)
        .then((res)=>{
            setGigMusicians(res.data.gig.musicians);
        })
        .catch((err)=>{
            console.log(err);
        })}, [])

return(
    <div className='table-responsive' style={{'borderRadius':'5px'}}>
        <table className='table panelBackground border border-2 border-dark text-white'>
            {/* <thead>
                <tr>
                    <th scope='col' className='col-6 text-center text-lg-start'>Musician</th>
                    <th scope='col' className='col-6 text-center text-lg-start'>Instrument</th>
                </tr>
            </thead> */}
            <tbody>
                {
                gigMusicians.map((gig)=>{
                return(
                        <tr key={gig.musician._id}>
                            <td className='text-center text-lg-start text-white'>{gig.musician.firstName} {gig.musician.lastName}</td>
                            <td className='text-center text-lg-start text-white'>{gig.musician.instrument}</td>
                    </tr>
                    )
                    })}
            </tbody>
        </table>
    </div>
)}

export default GigMusiciansList