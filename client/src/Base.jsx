import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Polyline,
  Marker,
  Polygon,
} from 'react-google-maps';
import axios from 'axios';
import PersistentDrawerRight from './Drawer.jsx';
import MapDirectionsRenderer from './MapDirectionsRenderer';
import ReactMapillary from './reactMapillary';
import Trigger from './trigger';
import InnerBorder from './innerBorder';
import Border from './border';
import { useState } from 'react';


function colorParser(color){
  var colorRed = '#D32F2F';
  var colorOrange = '#FF6D00';
  var colorYellow = '#FFD600';
  var colorGreen = '#2E7D32';
  var colorLGreen = '#8BC34A';
  var colorGray = '#757575';
  if (color == "red"){return colorRed;}
  else if (color == "orange"){return colorOrange;}
  else if (color == "yellow"){return colorYellow;}
  else if (color == "green"){return colorGreen;}
  else if (color == "light_green"){return colorLGreen;}
  else if (color == "gray"){return colorGray;}
  else{
    console.log("invalid input", color);
    return "#000000";
  }
}

const Map = withScriptjs(
    withGoogleMap(props => (
      <GoogleMap
        defaultCenter={props.defaultCenter}
        defaultZoom={props.defaultZoom}
        options ={{
            gestureHandling: "greedy"
        }}
      >
        {/* {props.places.map((marker, index) => {
          const position = {lat: marker.latitude, lng: marker.longitude};
          return <Marker key={index} position={position}/>;
        })} */}
        {/* { props.streets && props.streets.map((pos) => {
            // console.log("pos:", pos);
            return <MapDirectionsRenderer places={pos} travelMode={window.google.maps.TravelMode.WALKING} />;
        }) } */}
        {
          props.streets && props.streets.map((pos) =>{
            // console.log(pos);
            return (
            <Polyline 
              // path = {pos}
              path = {pos['geoid']}
              onClick = {() => props.setOpenRight(true)}
              options = {{
                strokeColor: colorParser(pos['color']),
                strokeOpacity: 0.4,
                strokeWeight: 2,
              }}
            />
            )
          })
        }
        {/* {
          props.streets && <Polyline
            onClick = {() => props.setOpenRight(true)}
            path = {props.polylineGeoCode}
            options = {{
              strokeColor: '#008B8B',
              strokeOpacity: 0.4,
              strokeWeight: 3,
            }}
          />
        } */}
        {
          props.openRight ? 
          <Marker 
          icon={{
            url: "https://img.icons8.com/fluent/48/000000/car.png",
            scale: 5.0,
            }}
          position={props.markerGeoCode}
          />:<h1></h1>
        }
        <Border/>
        <InnerBorder/>
      </GoogleMap>
    ))
);
  
const AppMap = () => {
    const locations = [
        {latitude: 42.360335, longitude: -83.118162},
        {latitude: 42.365803, longitude: -83.103634},
    ];

    const polylineGeoCode = [
      {lat: 42.44151, lng: -82.98046290000001},
      {lat: 42.4415717, lng: -82.97801080000001},
    ];

    const places = locations;
    const mapStyles = {        
        height: "100vh",
        width: "100%",
    };
    const [center, setCenter] = useState({lat: 42.37000890112815, lng: -83.0794112034308});
    const [streets, setStreets] = useState(null);
    // console.log("Streets", streets);

    const [test, setTest] = useState(0);
    const [openRight, setOpenRight] = useState(false);
    const [markerGeoCode, setMarkerGeoCode] = useState({lat: 0, lng: 0});

    function handleTrigger(newVal){
      setStreets(newVal);
    }

    async function streetsMaker(data){
        // console.log('data', data);
        setStreets(data);
    };

    async function makeArray(latLon){
        // console.log('latlon', latLon);
        let temp = [];
        for (var key in latLon){
            temp.push(latLon[key]['fields']);
            // console.log(latLon[key]['fields']);
        }
        streetsMaker(temp);
    };

    const handleSubmit = e => {
        console.log("handling submit:");
        axios
          .post("get_geoid")
          .then(res => {
            console.log(res.data);
            makeArray(res.data);
          })
          .then(() =>{
            // console.log("Done");
          })
          .catch(function (error) {
            console.log(error);
          })
        e.preventDefault();
    };
  
    return (
      <div>
      <PersistentDrawerRight 
        value={test} 
        onChange={handleTrigger} 
        openRight = {openRight} 
        handleOpenRight = {setOpenRight}
        setMarkerGeoCode = {setMarkerGeoCode}
      />
      <Map
        googleMapURL={
          'https://maps.googleapis.com/maps/api/js?key=' +
          'AIzaSyAEthE8cXJYTabbM5WNNkbE1J3jWIvMDoU' +
          '&v=3.exp&libraries=geometry,drawing,places'
        }
        places={places}
        loadingElement={<div></div>}
        containerElement={<div style={{width: "100%", float:"left"}}/>}
        mapElement={<div style={mapStyles}/>}
        defaultCenter={center}
        defaultZoom={12}
        streets={streets}
        polylineGeoCode = {polylineGeoCode}
        openRight = {openRight}
        setOpenRight = {setOpenRight}
        markerGeoCode = {markerGeoCode}
      />
    
     {/* <ReactMapillary/> */}
     </div>
    );
};
  
export default AppMap;