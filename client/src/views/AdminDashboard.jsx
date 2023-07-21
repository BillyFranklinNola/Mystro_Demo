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
        <div className='viewport container'>
            <div className='row d-flex justify-content-around'>
                <div className='col-lg-7'>
                    <h2 className="subNav text-warning mx-auto my-4">All Gigs:</h2>
                    <div className='mt-3'>
                        <AdminGigList 
                            setAllGigs={allGigs} 
                            gigDeleteHandler={gigDeleteHandler}/>
                    </div>
                    <Link className='btn btn-warning my-1 mt-lg-3 mb-4 mb-lg-0' to ='/gigs/createGig'>Add New Gig</Link>
                </div>
                <div className='col-lg-5 col-xl-4'>
                    <h2 className="subNav text-warning mx-auto my-4">All Musicians:</h2>
                    <div className='mt-3'>
                        <AdminMusicianList 
                            setAllMusicians={allMusicians} 
                            musicianDeleteHandler={musicianDeleteHandler}/>
                    </div>
                    <Link className='btn btn-warning mt-3' to ='/musicians/register'>Add New Musician</Link>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard