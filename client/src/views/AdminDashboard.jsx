import React, {useState} from 'react'
import AdminMusicianList from '../components/AdminMusicianList';
import AdminGigList from '../components/AdminGigList';
import {Link} from 'react-router-dom';
import NavBar from '../components/NavBar';

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
    <div style={{
        background: 'radial-gradient( circle farthest-corner at 10% 20%, rgba(0,107,141,1) 0%, rgba(0,69,91,1) 90%)',
    }}>   
        <div className='pt-3'>
            <NavBar/>
            <div className='d-flex'>
                <div>
                </div>
                <div className='col-5'>
                </div>
            </div>
            <div className='d-flex justify-content-around p-5'>
                <div className='col-6'>
                    <h2 className="text-warning mx-auto mt-5 mb-5">All Gigs:</h2>
                    <AdminGigList 
                        setAllGigs={allGigs} 
                        gigDeleteHandler={gigDeleteHandler}/>
                    <Link className='btn btn-warning mt-3' to ='/gigs/createGig'>Create New Gig</Link>
                </div>
                <div className='col-5'>
                    <h2 className="text-warning mx-auto mt-5 mb-5">All Musicians:</h2>
                    <AdminMusicianList 
                        setAllMusicians={allMusicians} 
                        musicianDeleteHandler={musicianDeleteHandler}/>
                    <Link className='btn btn-warning mt-3' to ='/'>Register New Musician</Link>
                </div>
            </div>
        </div>
    </div>
    )
}

export default AdminDashboard