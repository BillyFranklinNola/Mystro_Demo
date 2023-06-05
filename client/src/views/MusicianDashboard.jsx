import React, {useState} from 'react'
import MusiancianGigList from '../components/MusicianGigList'

const MusicianDashboard = () => {
    const [musicianGigs, setMusicianGigs] = useState([])


return (
    <div>
        <MusiancianGigList musicianGigs={musicianGigs}/>
    </div>
    )
}

export default MusicianDashboard