import React, {useEffect, useState} from 'react';
import {GoogleMap, useLoadScript, Marker} from '@react-google-maps/api';
import '../styles/globals.css';
import axios from 'axios';

const MapOfGig = (props) => {
    const {gig} = props;
    const [gigLattitude, setGigLattitude] = useState(null);
    const [gigLongitude, setGigLongitude] = useState(null);
    const MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });

    useEffect(() => {
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${gig.streetAddress},+${gig.city}s,+${gig.state},+${gig.zipCode}&key=${MAPS_API_KEY}`)
        .then(res => {
            const lat = parseFloat(res.data.results[0].geometry.location.lat);
            const lng = parseFloat(res.data.results[0].geometry.location.lng);
            console.log(res.data.results[0].geometry.location.lat);
            console.log(res.data.results[0].geometry.location.lng);
            setGigLattitude(lat);
            setGigLongitude(lng);

        })
        .catch(err => console.log(err));
    }, [gig])

    // const center = useMemo(() => ({lat: gigLattitude, lng: gigLongitude }), []);

    if (!isLoaded) return <div>"Loading...";</div>
    return (
        <div>
            <GoogleMap
                zoom={10} 
                center={{lat: gigLattitude, lng: gigLongitude }} 
                mapContainerClassName="map-container"
            >
            <Marker position={{lat: gigLattitude, lng: gigLongitude }}/>
            </GoogleMap>
        </div>
    );
}

export default MapOfGig;
