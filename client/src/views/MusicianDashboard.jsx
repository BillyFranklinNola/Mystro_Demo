import React, {useState} from 'react'
import MusicianGigList from '../components/MusicianGigList'


const MusicianDashboard = () => {
    const [musicianGigs, setMusicianGigs] = useState([])

    return (
        <div className='viewport container-fluid px-3'>
            <h2 className="subNav text-warning mx-auto my-4">Upcoming Gigs:</h2>
            <div className='col-sm-8 mt-3 mx-auto'>
                <MusicianGigList musicianGigs={musicianGigs}/>
            </div>
        </div>
    )
}

export default MusicianDashboard