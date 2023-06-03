import React, {useState, useEffect} from 'react'
import axios from 'axios';
import AdminMusicianList from '../components/AdminMusicianList';

const MusicianDashboard = () => {
    const [allMusicians, setAllMusicians] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:8000/api/muscicians/list")
        .then((res)=>{
            console.log(res.data);
            setAllMusicians(res.data);
        })
        .catch((err)=>{
            console.log(err);
            })
    }, [])

    const deleteHandler = id => {
        setAllMusicians(allMusicians.filter(musician => musician._id !== id))
    }

return (
    <div>
        {errors.map((err, index) => <p className='text-danger' key={index}>{err}</p>)}
        <AdminMusicianList setAllMusicians={allMusicians} deleteHandler={deleteHandler}/>
    </div>
)
}

export default MusicianDashboard