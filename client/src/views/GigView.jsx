import React,{useState, useEffect} from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import GigMusiciansList from "../components/GigMusiciansList";
import NavBar from "../components/NavBar";
import MapOfGig from "../components/MapOfGig";
import GigWeather from "../components/GigWeather";

const GigView = (props) => {
    const [gig, setGig] = useState({});
    const [gigMusicians, setGigMusicians] = useState([]);
    const [gigLattitude, setGigLattitude] = useState("");
    const [gigLongitude, setGigLongitude] = useState("");
    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/gigs/oneGig/${id}`)
            .then(res => {
                setGig(res.data.gig);
                console.log(res.data.gig);
            })
            .catch(err => console.log(err));
        }, [])

    const formatTime = (time) => {
        if (time) {
            const [hours, minutes] = time.split(":");
            const formattedTime = new Date();
            formattedTime.setHours(hours);
            formattedTime.setMinutes(minutes);

            return formattedTime.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
            });
        }
        return "";
    };

    const setUpBy = formatTime(gig.setUpBy);
    const startTime = formatTime(gig.startTime);
    const endTime = formatTime(gig.endTime);

    const formatDate = (date) => {
        if (date) {
            const [year, month, day] = date.split("-");
            const formattedDate = new Date();
            formattedDate.setFullYear(year);
            formattedDate.setMonth(month - 1);
            formattedDate.setDate(day);

            return formattedDate.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            });
        }
        return "";
    };

    const gigDate = formatDate(gig.date);
    const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = dayName[new Date(gig.date).getDay()];

return (
    <div style={{
        background: 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(0,107,141,1) 0%, rgba(0,69,91,1) 90%)',
    }}>
        <div className="pt-3">
            <NavBar/>
            <div className="d-flex justify-content-between">
                <h2 className="text-warning mt-3 mb-3 ms-4">{gig.venue} - {gig.city},{gig.state} </h2>
                <h2 className="text-warning mt-3 mb-3 me-4">{dayOfWeek}, {gigDate}</h2>
            </div>
            <div className="border border-3 border-secondary rounded m-1 mt-2 p-3">
                <div className="d-flex justify-content-between">
                    <div className="col-4">
                        <div className="border border-3 border-secondary rounded mb-3 p-3">
                            <MapOfGig
                                gig={gig} 
                                setGig={setGig} 
                                gigLattitude={gigLattitude} 
                                setGigLattitude={setGigLattitude} 
                                gigLongitude={gigLongitude} 
                                setGigLongitude={setGigLongitude}/>
                        </div>
                        <div className="border border-3 border-secondary rounded p-2 text-center text-white"> 
                            <p className="mt-3">{gig.venue}</p>
                            <p>{gig.streetAddress}</p>
                            <p>{gig.city}, {gig.state} {gig.zipCode}</p>
                        </div>
                    </div>
                    <div className="col-3 border border-3 border-secondary rounded p-3">
                        <div className="border border-3 border-secondary rounded p-2 text-white">
                            <p className="mt-3">Set up by: {setUpBy}</p>
                            <p>Start: {startTime}</p>
                            <p>End: {endTime}</p>                
                        </div>
                        <div className="border border-3 border-secondary rounded p-3 text-white text-center mt-3">
                            <h3>Notes</h3>
                            <p>No Elevator</p>
                            <p>Valerie - Amy Winehouse</p>
                            <p>Uptown Funk - Bruno Mars</p>
                        </div>
                        <div className="mt-3">
                            <Link to={`/gigs/viewGig/${id}`} className="btn btn-warning w-100">Charts</Link>
                            <Link to={`/gigs/timeline/${id}`} className="btn btn-warning w-100 mt-3">Timline</Link>
                        </div>
                    </div>
                    <div className="col-4">
                        <GigMusiciansList gigMusicians={gigMusicians} setGigMusicians={setGigMusicians} id={id}/> 
                        <div className="mt-3">
                            <GigWeather
                                gig={gig} 
                                setGig={setGig} 
                                gigLattitude={gigLattitude} 
                                setGigLattitude={setGigLattitude} 
                                gigLongitude={gigLongitude} 
                                setGigLongitude={setGigLongitude}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default GigView;