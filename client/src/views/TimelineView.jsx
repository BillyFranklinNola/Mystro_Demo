import React, {useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import NavBar from "../components/NavBar";


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

    // const cld = new Cloudinary({
    //     cloud: {
    //         cloud_name: "dyl4kpmie", 
    //         secure: true
    //     }
    // });  

    // const fetchImage = cld.image()

    return (
            <div className="pt-3" style={{
                background: 'radial-gradient(circle farthest-corner at 10% 20%,  rgba(0,107,141,1) 0%, rgba(0,69,91,1) 90%)',
            }}>
                <NavBar/>
                <div className="container-fluid">
                    <div className="w-50 mx-auto">
                        <h2 className="text-warning mb-5 mt-5">Full Timline</h2>
                        <img src={require('../assets/Sample_Timeline.png')} alt="Image of full timelinr" className="img-fluid border border-dark border-3"/>
                    </div>
                </div>
            </div>
    );
}

export default TimelineView;
