import React, {useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";


const TimelineView = (props) => {
    const {id} = useParams();
    const [gig, setGig] = useState(props);

    useEffect(()=>{
        axios.get(`/api/gigs/${id}`)
        .then((res)=>{
            console.log(res);
            setGig(res.data.gig);
        })
        .catch((err)=>{
            console.log(err);
        })
        }, [id])

    return (
        <div className="viewport container-fluid pt-3">
            <div className="w-50 mx-auto">
                {
                gig.timeline !== '' ?
                <div>
                    <h3 className="subNav mb-5 mt-3">Timeline</h3>
                    <img src={`/uploads/${gig.timeline}`} alt="timeline" className="img-fluid border border-dark border-3"/>
                </div> : 
                <h2 className="subNav text-white fs-5 mt-5">Timeline coming soon</h2>
                }
            </div>
        </div>
    );
}

export default TimelineView;
