/* global google */

import React, {useEffect, useState} from 'react';
import { DirectionsRenderer } from "react-google-maps";

export const MapDirectionsRenderer = (props) => {
    const [directions, setDirections] = useState(null);
    const [error, setError] = useState(null);
    const { places, travelMode } = props;

    // const waypoints = places.map(p => ({
    // location: { lat: p.latitude, lng: p.longitude },
    // stopover: true
    // }));
    const waypoints = [
        {
            location: {lat: places['startLng'], lng: places['startLat']},
            stopover: true
        },
        {
            location: {lat: places['endLng'], lng: places['endLat']},
            stopover: true,
        },
    ]

    const origin = waypoints.shift().location;
    const destination = waypoints.pop().location;
    const directionsService = new google.maps.DirectionsService();

    useEffect(() => {
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: travelMode,
          waypoints: waypoints
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            console.log("Status Good: ", result);
            setDirections(result);
          } else {
            console.log("Status Bad: ", result);
          }
        }
      );
    }, []);
    if (error) {
      return <h1>{error}</h1>;
    }

    const onMarkerClick = (event) => {
      console.log('clicked');
    }
    

    return (
      directions && (
        <div onClick = {()=> console.log('Clicked!')}>
        <DirectionsRenderer 
        onClick = {() => alert("HELLO ITS ME")}
        directions = {directions}
        options={{
            polylineOptions: {
              strokeOpacity: 0.4,
              strokeWeight: 3
            },
            preserveViewport: true,
            suppressMarkers: true,
            icon: { scale: 3 }
          }}
        />
        </div>
     )
    );
  }

export default MapDirectionsRenderer;