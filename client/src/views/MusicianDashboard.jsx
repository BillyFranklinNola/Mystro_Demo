import React, {useState} from 'react'
import MusicianGigList from '../components/MusicianGigList'
import NavBar from '../components/NavBar'
import image from '../images/backgroundimage.jpg'

const MusicianDashboard = () => {
    const [musicianGigs, setMusicianGigs] = useState([])

return (
    // <div style={{
    //     background: 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(0,107,141,1) 0%, rgba(0,69,91,1) 90%)',
    //     minHeight: "100vh"
    // }}>
    <div className='bg-image' style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: 'center',
        minHeight: '100vh',
    }}>
            <div className="pt-3">
            <NavBar/>
            <div className='container-fluid px-3'>
                <h2 className="subNav text-warning mx-auto my-4 my-lg-5">Upcoming Gigs:</h2>
                <div className='col-sm-8 mx-auto'>
                    <MusicianGigList musicianGigs={musicianGigs}/>
                </div>
            </div>
        </div>
    </div>
    )
}

export default MusicianDashboard