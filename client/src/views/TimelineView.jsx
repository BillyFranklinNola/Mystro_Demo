import React, {useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import NavBar from "../components/NavBar";
import image from '../images/backgroundimage.jpg';


const TimelineView = (props) => {
    const {id} = useParams();
    const [gig, setGig] = useState(props);

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/gigs/${id}`)
        .then((res)=>{
            console.log(res);
            setGig(res.data.gig);
        })
        .catch((err)=>{
            console.log(err);
        })
        }, [id])

    return (
        // <div className="pt-3 h-100" style={{
        //     background: 'radial-gradient(circle farthest-corner at 10% 20%,  rgba(0,107,141,1) 0%, rgba(0,69,91,1) 90%)',
        //     minHeight: "100vh"
        // }}>
        <div className='bg-image' style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: 'center',
            minHeight: '100vh',
        }}>
            <div className="pt-3">
            <NavBar/>
                <div className="container">
                    <div className="w-50 mx-auto">
                        {
                        gig.timeline !== '' ?
                        <div>
                            <h2 className="text-warning mb-5 mt-5">Full Timline</h2>
                            <img src={`http://localhost:8000/uploads/${gig.timeline}`} alt="Image of full timeline" className="img-fluid border border-dark border-3"/>
                        </div> : 
                        <h2 className="subNav text-warning fs-5 mt-5">Timeline coming soon</h2>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TimelineView;
