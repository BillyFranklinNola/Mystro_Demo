import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'

const GigMusiciansList = (props) => {
    const [gigMusicians, setGigMusicians] = useState([])
    const {id} = useParams()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/gigs/oneGig/${id}`)
        .then((res)=>{
            console.log(res.data.gig.musicians);
            setGigMusicians(res.data.gig.musicians);
        })
        .catch((err)=>{
            console.log(err);
        })}, [])

return(
    <div className='p-2 border border-3 border-secondary rounded'>
        <table className='table table-striped border border-3 border-secondary rounded mx-auto text-white'>
            <thead>
                <tr>
                    <th scope='col' className='col-4 text-start'>Musician</th>
                    <th scope='col' className='text-start'>Instrument</th>
                </tr>
            </thead>
            <tbody>
                {
                gigMusicians.map((i)=>{
                return(
                        <tr key={i.musician._id}>
                            <td className='text-start text-white'>{i.musician.firstName} {i.musician.lastName}</td>
                            <td className='text-start text-white'>{i.musician.instrument}</td>
                    </tr>
                    )
                    })}
            </tbody>
        </table>
    </div>
)
}

export default GigMusiciansList