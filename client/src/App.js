/* global google */
import React, {useState, useEffect} from 'react';
//// for integration with python
import axios from 'axios';
import Street from './Street.jsx';
import MapDirectionsRenderer from './DirectionRenderer.jsx';
import PersistentDrawerRight from './Drawer.jsx';
import Button from '@material-ui/core/Button';
import { withGoogleMap, withScriptjs,GoogleMap, LoadScript, 
  Marker, InfoWindow, StreetViewPanorama, DirectionsRenderer } from '@react-google-maps/api';
import './App.css';

function App() {
  
  const defaultCenter = {
    lat: 42.35, lng: -83.0457538
  }
  const [center, setCenter] = useState(defaultCenter);
  const [url, setUrl] = useState('');
  const [selected, setSelected] = useState({});

  const [locationArray, setLocationArray] = useState([]);

  const mapStyles = {        
    height: "100vh",
    width: "100%"
  };

  const locations = [
    {
      name: "Cadillac Square, Detroit, Wayne County, Michigan, 48226, USA",
      location: {lat: 42.331427, lng: -83.0457538},
      mapKey : "Ui2edZ5tTmv06LZmZTbJEA",
    },
    {
      name: "4662, Heck, Poletown East, Detroit, Wayne County, Michigan, 48207, USA",
      location: {lat: 42.367350, lng: -83.026907},
      mapKey : "CVujV7TFQUvpAXHUcso7_A",
    },
    {
      name: "4159, Lincoln, Woodbridge, Detroit, Wayne County, Michigan, 48208, USA",
      location: {lat: 42.346911, lng: -83.074396},
      mapKey : "37wFuSBQC3Gul0NOJBvtdg",
    },
  ];

  function onSelect(item) {
    setSelected({name: "display", location: item});
    setCenter({lat: item.lat, lng: item.lng});
    console.log('item:', item);
    console.log('setCentered');
  }

  function displayMarkers(){
    return locations.map((item) => {
      return (
        <Marker
          key = {item.name}
          position = {{lat: item.location.lat, lng: item.location.lng}}
          onClick = {() => onSelect(item)}
        />
      )
    })
  }

  function displayRoadSegments(){
    return locationArray.map((item) =>{
      var latitude = item[0];
      var longitude = item[1];
      var myLatLng = { lat : latitude, lng: longitude }
      console.log('myLatLng', myLatLng);
      return (
        <div>
        <Marker
            position = {myLatLng}
            onClick = {() => onSelect(myLatLng)}
        />
        </div>
      )
    })
  }

  async function makeArray(latLon){
    let temp = [];
    for (var i = 0; i < latLon.length; ++i){
      temp.push(latLon[i]);
    }
    // console.log("TEMP:", temp);
    setLocationArray(latLon);
  }

  const handleSubmit = e => {
    console.log("handling submit:", url);
    axios
      .post("m_dice", url)
      .then(res => {
        let latLon = res.data;
        console.log("LatLon",latLon);
        makeArray(latLon);
      })
      .catch(function (error) {
        console.log(error);
      })
    e.preventDefault();
  };

  return (
    <div className="App">
      {<PersistentDrawerRight/>}
      <LoadScript
       googleMapsApiKey='AIzaSyAEthE8cXJYTabbM5WNNkbE1J3jWIvMDoU'>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={14}
          center={center}
          options={{streetViewControl: true}}
        >
          {/*displayMarkers()*/}
          { (locationArray.length !== undefined) ? (displayRoadSegments()): ""}

          {/*MapDirectionsRenderer(locationArray)*/}
          {/*
          <InfoWindow
                position = {selected.location}
                clickable = {true}
                onCloseClick ={() => setSelected({})}
              >
                <div>
                  <Street mapKey = {selected}/>
                  <p>{selected.name}</p>
                  <StreetViewPanorama 
                    position={selected.location} 
                    visible={true}
                    fullscreenControl={false}
                    enableCloseButton={true}
                  >
                  </StreetViewPanorama>
                  <Button variant="contained" color="primary" onClick={() => console.log("SAVED!")}>SAVE</Button>
                </div>
              </InfoWindow>
          */}
          {
            (selected.location) &&
            (
              <StreetViewPanorama 
                    position={selected.location} 
                    visible={true}
                    fullscreenControl={false}
                    enableCloseButton={false}
                  >
              </StreetViewPanorama>
            )
          }
        </GoogleMap>
      </LoadScript>
     <form onSubmit = {handleSubmit}>
          <input type = "submit" value = "Trigger Backend" />
     </form>
     
    </div>
  );
}

export default App;