import React, {useEffect, useState} from "react";
import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";
import axios from "axios";



const ChartsView = () => {

    const iRealLogo = require("../assets/iRealproLogo.png");
    const pdfLogo = require("../assets/pdfLogo.png");
    const {id} = useParams();
    const [gig, setGig] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8000/api/gigs/oneGig/${id}`)
            .then(res => {
                setGig(res.data.gig);
                console.log(res.data.gig);
            })
            
            .catch(err => console.log(err));
        }, [])

    const handleDownload = (fileName) => {
        console.log(fileName);
        const downloadURL = `http://localhost:8000/api/gigs/download/${fileName}`
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = fileName;
        link.click();
    }

    return (
        <div style={{
            background: 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(0,107,141,1) 0%, rgba(0,69,91,1) 90%)',
        }} className="py-3">
            <NavBar/>
            <div>
            <h2 className="text-white my-5">Click to Download:</h2>
                <div className="container-fluid d-flex flex-column flex-sm-row align-items-center">
                    <div className="d-flex align-items-center mx-3 mb-5 p-3">
                        <div className="col">
                            <img src={iRealLogo} className="w-50 h-auto" alt="Logo for iReal Pro" onClick={() => handleDownload(gig.iRealCharts)}/>
                        </div>
                        <div className="col">
                            <img src={pdfLogo} className="w-50 h-auto" alt="Logo for PDF" onClick={() => handleDownload(gig.pdfCharts)}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChartsView;