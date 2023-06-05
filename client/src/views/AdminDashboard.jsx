import React, {useState} from 'react'
import AdminMusicianList from '../components/AdminMusicianList';
import AdminGigList from '../components/AdminGigList';

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
    <div>
        <AdminGigList setAllGigs={allGigs} gigDeleteHandler={gigDeleteHandler}/>
        <AdminMusicianList setAllMusicians={allMusicians} musicianDeleteHandler={musicianDeleteHandler}/>
    </div>
    )
}

export default AdminDashboard