import React, {useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import NavBar from "../components/NavBar";


const TimelineView = (props) => {
    const {id} = useParams();
    const [gig, setGig] = useState(props);
    const [timelineFile, setTimelineFile] = useState("");

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/gigs/oneGig/${id}`)
        .then((res)=>{
            console.log(res);
            setGig(res.data.gig);
        })
        .catch((err)=>{
            console.log(err);
        })
        }, [id])

    console.log(gig.timeline);

    return (
        <div className="pt-3 h-100" style={{
            background: 'radial-gradient(circle farthest-corner at 10% 20%,  rgba(0,107,141,1) 0%, rgba(0,69,91,1) 90%)',
            minHeight: "100vh"
        }}>
            <NavBar/>
            <div className="container">
                <div className="w-50 mx-auto">
                    {
                    gig.timeline != '' ?
                    <div>
                        <h2 className="text-warning mb-5 mt-5">Full Timline</h2>
                        <img src={`http://localhost:8000/uploads/${gig.timeline}`} alt="Image of full timeline" className="img-fluid border border-dark border-3"/>
                    </div> : 
                    <h2 className="text-warning mb-5 mt-5 fs-6 fs-md-5 fs-lg-2">Timeline coming soon</h2>
                    }
                </div>
            </div>
        </div>
    );
}

export default TimelineView;
