import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const GigWeather = (props) => {
    const [gig, setGig] = useState({});
    const [gigWeather, setGigWeather] = useState({});
    const {id} = useParams();

    useEffect(() => {
        axios.get(
            `http://localhost:8000/api/gigs/oneGig/${id}`
            )
        .then((res)=>{
            console.log(res.data.gig);
            setGig(res.data.gig);
        })
            .catch((err)=>{
                console.log(err);
        })}, []);



    useEffect(() => {
        axios.get(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${gig.city}/${gig.date}/${gig.date}?unitGroup=us&include=days&key=BQY89VYXBUYJF8D9H678L8LQX&contentType=json`
            )
        .then((res)=>{
            console.log(res.data.days[0])
            setGigWeather(res.data.days[0]);
        })
        .catch((err)=>{
            console.log(err);
        })}, [gig]);

    return (
        <div className="border border-3 border-secondary rounded text-white p-3">
            <h3 className="mb-3">Gig Forecast</h3>
            <p>High: {gigWeather.tempmax}º</p>
            <p>Low: {gigWeather.tempmin}º</p>
            <p>Humidity: {gigWeather.humidity}%</p>
            <p>{gigWeather.conditions}</p>
        </div>
    );
}

export default GigWeather;