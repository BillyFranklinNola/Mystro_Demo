import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../styles/globals.css';


const ChartsView = () => {

    const iRealLogo = require("../images/iRealproLogo.png");
    const pdfLogo = require("../images/pdfLogo.png");
    const {id} = useParams();
    const [gig, setGig] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8000/api/gigs/${id}`)
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
        <div className="container-fluid pt-3 pb-2">
            <div>
            {
                gig.iRealCharts !== "" || gig.pdfCharts !== "" ?
            <h2 className="subNav mt-4 my-sm-5 text-warning">Click Icon to Download:</h2>
            :
            null
            }    
                <div className="container-fluid d-flex flex-column flex-sm-row mx-0 mx-md-3 mb-5 p-3">
                    <div className="col mx-auto mx-md-0">
                        {
                        gig.iRealCharts !== ""?
                        <img src={iRealLogo} className="w-50 h-auto" alt="Logo for iReal Pro" onClick={() => handleDownload(gig.iRealCharts)}/>
                        :
                        <h2 className="subNav text-warning mb-5 mt-5 ms-lg-5 fs-6">iReal Pro charts coming soon</h2>
                        }
                    </div>
                    <div className="col mx-auto mx-md-0 mt-4 mt-sm-0">
                        {
                        gig.pdfCharts !== ""?
                        <img src={pdfLogo} className="w-50 h-auto" alt="Logo for PDF" onClick={() => handleDownload(gig.pdfCharts)}/>
                        :
                        <h2 className="subNav text-warning mb-5 mt-5 me-lg-5 fs-6">PDF charts coming soon</h2>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChartsView;