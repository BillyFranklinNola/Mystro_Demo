import React, {useState} from 'react'
import AdminMusicianList from '../components/AdminMusicianList';
import AdminGigList from '../components/AdminGigList';
import {Link} from 'react-router-dom';
import NavBar from '../components/NavBar';
import image from '../images/backgroundimage.jpg'

const AdminDashboard = () => {
    const [allMusicians, setAllMusicians] = useState([])
    const [allGigs, setAllGigs] = useState([])

    const musicianDeleteHandler = id => {
        setAllMusicians(allMusicians.filter(musician => musician._id !== id))
    }

    const gigDeleteHandler = id => {
        setAllGigs(allGigs.filter(gig => gig._id !== id))
    }

return (
    // <div style={{
    //     background: 'radial-gradient( circle farthest-corner at 10% 20%, rgba(0,107,141,1) 0%, rgba(0,69,91,1) 90%)',
    //     minHeight: "100vh"
    // }}>   
    <div className='bg-image' style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: 'center',
        minHeight: '100vh',
        backgroundSize: 'cover',
    }}>
        <div className='py-3'>
            <NavBar/>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-7'>
                        <h2 className="subNav text-warning mx-auto my-4 my-lg-5">All Gigs:</h2>
                        <AdminGigList 
                            setAllGigs={allGigs} 
                            gigDeleteHandler={gigDeleteHandler}/>
                        <Link className='btn btn-warning my-1 mt-lg-3' to ='/gigs/createGig'>Create New Gig</Link>
                    </div>
                    <div className='col-lg-5'>
                        <h2 className="subNav text-warning mx-auto my-4 my-lg-5">All Musicians:</h2>
                        <AdminMusicianList 
                            setAllMusicians={allMusicians} 
                            musicianDeleteHandler={musicianDeleteHandler}/>
                        <Link className='btn btn-warning mt-3 mb-5' to ='/'>Register New Musician</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default AdminDashboard