import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import '../styles/globals.css';

const GigWeather = (props) => {
    const [gig, setGig] = useState({});
    const [gigWeather, setGigWeather] = useState({});
    const {id} = useParams();

    useEffect(() => {
        axios.get(
            `http://localhost:8000/api/gigs/${id}`
            )
        .then((res)=>{
            console.log(res.data.gig);
            setGig(res.data.gig);
        })
            .catch((err)=>{
                console.log(err);
        })}, []);

    useEffect(() =>  {
        async function gigForecast() {
            try {
                if (gig.date) {
            const formattedDate = new Date(gig.date).toISOString().split('T')[0];
            console.log(formattedDate);
            const res = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${gig.city}/${formattedDate}/${formattedDate}?unitGroup=us&include=days&key=BQY89VYXBUYJF8D9H678L8LQX&contentType=json`)
            setGigWeather(res.data.days[0]);
                }
            } catch (err) {
                console.log(err);
            }
        }
        gigForecast();
    }, [gig]);
        

        

    return (
        <div className="panelBackground border border-2 border-dark rounded text-white p-3">
            <h3 className="mb-3 mt-2">Gig Forecast</h3>
            <p>High: {gigWeather.tempmax}º</p>
            <p>Low: {gigWeather.tempmin}º</p>
            <p>Rain: {gigWeather.precip}%</p>
            <p>{gigWeather.conditions}</p>
        </div>
    );
}

export default GigWeather;