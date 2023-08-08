import React,{useState, useEffect} from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import GigMusiciansList from "../components/GigMusiciansList";
import MapOfGig from "../components/MapOfGig";
import GigWeather from "../components/GigWeather";
import '../styles/globals.css';


const GigView = () => {
    const [gig, setGig] = useState({});
    const [gigMusicians, setGigMusicians] = useState([]);
    const [gigLattitude, setGigLattitude] = useState("");
    const [gigLongitude, setGigLongitude] = useState("");
    const {id} = useParams();

    useEffect(() => {
        axios.get(`/api/gigs/${id}`)
            .then(res => {
                setGig(res.data.gig);
            })
            .catch(err => console.log(err));
        }, [])

    console.log(gig);
    console.log(gig.note1);

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
        <div className="viewport container-fluid p-3 p-lg-4">
            <div>
                <h3 className="subNav mb-3 mt-lg-2">{gig.bandName}</h3>
            </div>
            <div className="subNav mb-3 mb-lg-4 mt-lg-2">
                <h4>{gig.venue}</h4>
                <h6>{gig.city}, {gig.state}</h6>
            </div>
            <div className="d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between">
                <div className="col-12 col-lg-4 mx-auto mx-lg-0 mb-3 mb-lg-0">
                    <div className="panelBackground border border-2 border-dark rounded mb-3 mt-2 mt-lg-0 p-3">
                        <MapOfGig
                            gig={gig} 
                            setGig={setGig} 
                            gigLattitude={gigLattitude} 
                            setGigLattitude={setGigLattitude} 
                            gigLongitude={gigLongitude} 
                            setGigLongitude={setGigLongitude}/>
                    </div>
                    <div className="panelBackground border border-2 border-dark rounded p-2 text-center text-white"> 
                        <p className="mt-3">{gig.venue}</p>
                        <p>{gig.streetAddress}</p>
                        <p>{gig.city}, {gig.state} {gig.zipCode}</p>
                    </div>
                </div>
                <div className="col-12 col-lg-3 mx-auto mx-lg-0 mb-3 mb-lg-0">
                    <div className="panelBackground border border-2 border-dark rounded p-2 text-white">
                        <h6 className="text-light mt-3">- {dayOfWeek}, {gigDate} -</h6>
                        <p className="mt-3">Set up by: {setUpBy}</p>
                        <p>Start: {startTime}</p>
                        <p>End: {endTime}</p>                
                    </div>
                    <div className="panelBackground border border-2 border-dark rounded p-3 text-white text-center mt-3">
                        <h3 className="mb-3">Notes</h3>
                        {/* {
                            gig.notes ?
                            <p>{gig.notes}</p> :
                            <p>No notes for this gig</p>
                        } */}
                        <p>{gig.note1}</p>
                        <p>{gig.note2}</p>
                        <p>{gig.note3}</p>
                        <p>{gig.note4}</p>
                        <p>{gig.note5}</p>
                    </div>
                    <div className="d-flex flex-row flex-lg-column mt-3">
                        <Link to={`/gigs/charts/${id}`} className="btn btn-warning w-100">Charts</Link>
                        <Link to={`/gigs/timeline/${id}`} className="btn btn-warning w-100 ms-2 ms-lg-0 mt-lg-3">Timline</Link>
                    </div>
                </div>
                <div className="col-12 col-lg-4 mx-auto mx-lg-0 mb-3 mb-lg-0">
                    <GigMusiciansList gigMusicians={gigMusicians} setGigMusicians={setGigMusicians} id={id}/> 
                    <div>
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
    )
}

export default GigView;