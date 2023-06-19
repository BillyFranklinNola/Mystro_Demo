import React, {useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { Cloudinary } from "cloudinary-core";

const TimelineView = (props) => {
    const {id} = useParams();
    const [gig, setGig] = useState(props);
    const [timelineFile, setTimelineFile] = useState(props);

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/gigs/oneGig/${id}`)
        .then((res)=>{
            console.log(res);
            setGig(res.data.gig);
        })
        .catch((err)=>{
            console.log(err);
        })
        }, [])

        console.log(gig.timeline);

    const cld = new Cloudinary({
        cloud: {
            cloud_name: "dyl4kpmie", 
            secure: true
        }
    });  

    const fetchImage = cld.image()

    return (
        <div style={{
            background: 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(0,107,141,1) 0%, rgba(0,69,91,1) 90%)',
        }}>

        </div>
    );
}

export default TimelineView;
