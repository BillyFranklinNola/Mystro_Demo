import React, {useState} from 'react'
import MusicianGigList from '../components/MusicianGigList'


const MusicianDashboard = () => {
    const [musicianGigs, setMusicianGigs] = useState([])

    return (
        <div className='viewport container-fluid px-3 pt-4'>
            <h2 className="subNav text-warning mx-auto my-4 my-lg-5">Upcoming Gigs:</h2>
            <div className='col-sm-8 mx-auto'>
                <MusicianGigList musicianGigs={musicianGigs}/>
            </div>
        </div>
    )
}

export default MusicianDashboard