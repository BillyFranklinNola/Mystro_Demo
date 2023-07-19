import React, {useState} from 'react'
import AdminMusicianList from '../components/AdminMusicianList';
import AdminGigList from '../components/AdminGigList';
import {Link} from 'react-router-dom';


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
    )
}

export default AdminDashboard