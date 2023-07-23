import React, {useState} from 'react'
import MusicianGigList from '../components/MusicianGigList'


const MusicianDashboard = () => {
    const [musicianGigs, setMusicianGigs] = useState([])

    return (
        <div className='viewport container-fluid px-3'>
            <h3 className="subNav mx-auto my-4">Upcoming Gigs:</h3>
            <div className='col-sm-8 mt-3 mx-auto'>
                <MusicianGigList musicianGigs={musicianGigs}/>
            </div>
        </div>
    )
}

export default MusicianDashboard