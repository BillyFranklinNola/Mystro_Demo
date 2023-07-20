import React, {useState} from 'react'
import MusicianGigList from '../components/MusicianGigList'


const MusicianDashboard = () => {
    const [musicianGigs, setMusicianGigs] = useState([])

    return (
        <div className='viewport container-fluid px-3'>
            <h2 className="subNav text-warning mx-auto mt-3 mb-4 my-lg-4">Upcoming Gigs:</h2>
            <div className='col-sm-8 mt-2 mt-lg-3 mx-auto'>
                <MusicianGigList musicianGigs={musicianGigs}/>
            </div>
        </div>
    )
}

export default MusicianDashboard