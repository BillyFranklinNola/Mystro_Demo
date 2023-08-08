import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../styles/globals.css';

const ChartsView = () => {

    const iRealLogo = require("../assets/images/iRealproLogo.png");
    const pdfLogo = require("../assets/images/pdfLogo.png");
    const {id} = useParams();
    const [gig, setGig] = useState({});

    useEffect(() => {
        axios.get(`/api/gigs/${id}`)
            .then(res => {
                setGig(res.data.gig);
                console.log(res.data.gig);
            })
            
            .catch(err => console.log(err));
        }, [id])

    // const handleDownload = (fileName) => {
    //     console.log(fileName);
    //     const downloadURL = `/api/gigs/download/${fileName}`
    //     const link = document.createElement('a');
    //     link.href = downloadURL;
    //     link.download = fileName;
    //     link.click();
    // }

    return (
        <div className="viewport container pb-2">
            <div>
            {
                gig.iRealCharts !== "" || gig.pdfCharts !== "" ?
            <h5 className="subNav my-4">Click to Download:</h5>
            :
            null
            }    
                <div className="panelBackground container-fluid d-flex flex-column flex-sm-row border border-2 border-dark rounded mt-3 mx-auto py-sm-5 px-3">
                    <div className="col mx-auto mx-md-0">
                        {
                        gig.iRealCharts !== "" ?
                        <a href={`https://mystro-musician.s3.amazonaws.com/${gig.iRealCharts}`} download>
                            <img src={iRealLogo} className="w-50 h-auto mt-5 mt-sm-0" alt="Logo for iReal Pro" />
                        </a>
                        :
                        <h6 className="subNav text-white mt-5 ms-lg-5">iReal Pro charts coming soon</h6>
                        }
                    </div>
                    <div className="col mx-auto mx-md-0 mt-4 mt-sm-0">
                        {
                        gig.pdfCharts !== "" ?
                        <a href={`https://mystro-musician.s3.amazonaws.com/${gig.pdfCharts}`} download>
                            <img src={pdfLogo} className="w-50 h-auto mb-5 mb-lg-0" alt="Logo for PDF" />
                        </a>
                        :
                        <h6 className="subNav text-white mt-4 mt-md-5 mb-5 mb-lg-0 me-lg-5">PDF charts coming soon</h6>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChartsView;