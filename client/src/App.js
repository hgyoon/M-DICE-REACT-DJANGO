import React, {useState} from 'react';
//// for integration with python
import axios from 'axios';
import Street from './Street.jsx';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import './App.css';

function App() {

  const [url, setUrl] = useState('');
  const [selected, setSelected] = useState({});

  const mapStyles = {        
    height: "100vh",
    width: "100%"};
  
  const defaultCenter = {
    lat: 42.35, lng: -83.0457538
  }

  const [center, setCenter] = useState(defaultCenter);

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

  const onSelect = item => {
    setSelected(item);
    setCenter({lat: item.location.lat, lng: item.location.lng});
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

  const handleSubmit = e => {
    console.log("handling submit:", url);
    axios
      .post("m_dice", url)
      .then(res => {
        alert(res.data)
      })
      .catch(function (error) {
        console.log(error);
      })
    e.preventDefault();
  };

  return (
    <div className="App">
        <form onSubmit = {handleSubmit}>
          <label>
            url: <input type = "text" name="url" value = {url} onChange = {e => setUrl(e.target.value)}></input>
          </label>
          <input type = "submit" value = "CHECK" />
        </form>
      <LoadScript
       googleMapsApiKey='AIzaSyAEthE8cXJYTabbM5WNNkbE1J3jWIvMDoU'>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={14}
          center={center}
        >
          { displayMarkers() }
          {
            selected.location &&
            (
              <InfoWindow
                position = {selected.location}
                clickable = {true}
                onCloseClick ={() => setSelected({})}
              >
                <div>
                  <Street mapKey = {selected.mapKey}/>
                  <p>{selected.name}</p>
                </div>
              </InfoWindow>
            )
          }
        </GoogleMap>
     </LoadScript>
    </div>
  );
}

export default App;