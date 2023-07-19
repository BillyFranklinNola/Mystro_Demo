import React, {useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";


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
        <div className="container-fluis pt-3">
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
    );
}

export default TimelineView;
