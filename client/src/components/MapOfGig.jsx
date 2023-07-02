import React, {useEffect, useState} from 'react';
import {GoogleMap, useLoadScript, Marker} from '@react-google-maps/api';
import '../styles/globals.css';
import axios from 'axios';
import {useMemo} from 'react';

const MapOfGig = (props) => {
    const {gig} = props;
    const [gigLatitude, setGigLatitude] = useState(null);
    const [gigLongitude, setGigLongitude] = useState(null);
    const MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });

    useEffect(() => {
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${gig.streetAddress},+${gig.city}s,+${gig.state},+${gig.zipCode}&key=${MAPS_API_KEY}`)
        .then(res => {
            const lat = (res.data.results[0].geometry.location.lat);
            const lng = (res.data.results[0].geometry.location.lng);
            console.log(res.data.results[0].geometry.location.lat);
            console.log(res.data.results[0].geometry.location.lng);
            console.log(lat);
            console.log(lng);
            setGigLatitude(lat);
            setGigLongitude(lng);

        })
        .catch(err => console.log(err));
    }, [gig])

    console.log(gigLatitude);
    console.log(gigLongitude);
    // const center = useMemo(() => ({lat: gigLattitude, lng: gigLongitude }), []);
    const center = useMemo(() => ({
        lat: gigLatitude,
        lng: gigLongitude
    }), [
        gigLatitude,
        gigLongitude
    ]);

    if (!isLoaded) return <div>"Loading...";</div>

    if (gigLatitude === null || gigLongitude === null) return null;


    return (
        <div>
            <GoogleMap
                zoom={10} 
                center={center} 
                mapContainerClassName="map-container">
                <Marker position={{lat: gigLatitude, lng: gigLongitude }}/>
            </GoogleMap>
        </div>
    );
}

export default MapOfGig;
