import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface MapProps {
    apiId: number;
}

const containerStyle = {
    height: '400px',
    width: '60%',
    margin: '100px'
};

const center = {
    lat: 20,
    lng: 0
};

const MapComponent = ({ apiId }: MapProps) => {
    const [position, setPosition] = useState<{ lat: number, lng: number }>({ lat: 0, lng: 0 });

    useEffect(() => {
        const fetchPlantData = async () => {
            try {
                const response = await fetch(`http://18.188.80.135:8080/api/plants/external/${apiId}`);
                const data = await response.json();

                const origin = data.origin;

                const geoResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${origin}&key=AIzaSyBRSx0MBs6lhTLCT3u71nxZRLNn5pj1mt4`);
                const geoData = await geoResponse.json();

                if (geoData.results && geoData.results.length > 0) {
                    const location = geoData.results[0].geometry.location;
                    setPosition({
                        lat: location.lat,
                        lng: location.lng
                    });
                } else {
                    console.error('No results found for the geocode request.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchPlantData();
    }, [apiId]);

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyBRSx0MBs6lhTLCT3u71nxZRLNn5pj1mt4"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={2}
            >
                <Marker position={position} />
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;
