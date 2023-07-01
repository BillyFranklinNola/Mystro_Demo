import React, {useState} from 'react'
import MusicianGigList from '../components/MusicianGigList'
import NavBar from '../components/NavBar'

const MusicianDashboard = () => {
    const [musicianGigs, setMusicianGigs] = useState([])

return (
    <div style={{
        background: 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(0,107,141,1) 0%, rgba(0,69,91,1) 90%)',
    }}>
        <div className='pt-3'>
            <NavBar/>
            <h2 className="text-warning mx-auto mt-5">Your Gigs:</h2>
            <div>
                <MusicianGigList musicianGigs={musicianGigs}/>
            </div>
        </div>
    </div>
    )
}

export default MusicianDashboard