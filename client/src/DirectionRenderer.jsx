/*global google*/

import React, {useState, useEffect} from 'react';
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  DirectionsRenderer
} from "@react-google-maps/api";

function MapDirectionsRenderer(items) {
    const [directions, setDirections] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const ApiKey = 'AIzaSyAEthE8cXJYTabbM5WNNkbE1J3jWIvMDoU';
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${ApiKey}`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      const waypoints = items.map(item => ({
        location: { lat: item[0], lng: item[1] },
        stopover: true
      }));
      console.log("WAYPOINTS", waypoints);
      const origin = waypoints.shift().location;
      const destination = waypoints.pop().location;
  
      const google = window.google;
      var directionsService = google.maps.DirectionsService();
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
          waypoints: waypoints
        },
        (result, status) => {
          console.log(result)
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            setError(result);
          }
        }
      );
    });
  
    if (error) {
      return <h1>{error}</h1>;
    }
    return (
      directions && (
        <DirectionsRenderer directions={directions} />
      )
    );
  }

  export default MapDirectionsRenderer;