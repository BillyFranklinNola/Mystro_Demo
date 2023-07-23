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
        .then((res) => {
            if (res.data.results && res.data.results[0] && res.data.results[0].geometry && res.data.results[0].geometry.location) {
                const { lat, lng } = res.data.results[0].geometry.location;
                console.log(res.data.results[0].geometry.location);
                console.log('lat:', lat);
                console.log('lng:', lng);
                setGigLatitude(lat);
                setGigLongitude(lng);
            } else {
                console.log('Invalid API response:', res.data);
            }
        })
            .catch((err) => console.log(err));
        }, [gig, MAPS_API_KEY]);

    if (!isLoaded || gigLatitude === null || gigLongitude === null) return (
        <div>"Loading...";</div>
    );

    

    const center = {
        lat: gigLatitude,
        lng: gigLongitude
    };

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
