/* global google */

import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Polyline,
  Marker,
} from 'react-google-maps';
import axios from 'axios';
import PersistentDrawerRight from './Drawer.jsx';
import MapDirectionsRenderer from './MapDirectionsRenderer';
import Trigger from './trigger';
import InnerBorder from './innerBorder';
import Border from './border';
import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';


function colorParser(color){
  var colorRed = '#D32F2F';
  var colorOrange = '#FF6D00';
  var colorYellow = '#FFD600';
  var colorGreen = '#2E7D32';
  var colorLGreen = '#8BC34A';
  var colorGray = '#757575';
  if (color === "red"){return colorRed;}
  else if (color === "orange"){return colorOrange;}
  else if (color === "yellow"){return colorYellow;}
  else if (color === "green"){return colorGreen;}
  else if (color === "light_green"){return colorLGreen;}
  else if (color === "gray"){return colorGray;}
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
                strokeOpacity: 1,
                strokeWeight: 3,
              }}
              onMouseOver = {() => console.log('in')}
              onMouseOut = {() => console.log('out')}
            />
            )
          })
        }
        {/* {
          google.maps.event.addListener(polylinePath, 'mouseover', function(latlng) {
            polylinePath.setOptions({strokeColor: '#00FFAA'})})
        }
        {
          google.maps.event.addListener(polylinePath, 'mouseout', function(latlng) {
            polylinePath.setOptions({strokeColor: '#FF0000'})})
        } */}
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
          // icon={{
          //   path: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z",
          //   scale: 2,
          //   rotation: props.rotation,
          // }}
          
          // icon= {{
          //   path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          //   scale: 4,
          //   rotation: props.rotation,
          // }}
          position={props.markerGeoCode}
          />:""
        }
        <Border/>
        <InnerBorder/>
      </GoogleMap>
    ))
);

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: '4vh',
    background: '#004445',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: '#FFF',
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
  },
}));

export default function DrawerMap() {
  const classes = useStyles();
  const locations = [
    {latitude: 42.360335, longitude: -83.118162},
    {latitude: 42.365803, longitude: -83.103634},
];

const polylineGeoCode = [
  {lat: 42.44151, lng: -82.98046290000001},
  {lat: 42.4415717, lng: -82.97801080000001},
];

const places = locations;
const containerStyles = {
    "padding-top": "4vh",
}
const mapStyles = {        
    height: "96vh",
    width: "100vw - 200px",
};
const [center, setCenter] = useState({lat: 42.37000890112815, lng: -83.0794112034308});
const [streets, setStreets] = useState(null);
// console.log("Streets", streets);

const [test, setTest] = useState(0);
const [openRight, setOpenRight] = useState(false);
const [markerGeoCode, setMarkerGeoCode] = useState({lat: 0, lng: 0});
const [rotation, setRotation] = useState(0);

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
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            M-DICE PAVEMENT PROJECT
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
      <Map
        googleMapURL={
          'https://maps.googleapis.com/maps/api/js?key=' +
          'AIzaSyAEthE8cXJYTabbM5WNNkbE1J3jWIvMDoU' +
          '&v=3.exp&libraries=geometry,drawing,places'
        }
        places={places}
        loadingElement={<div></div>}
        containerElement={<div style={containerStyles}></div>}
        mapElement={<div style={mapStyles}/>}
        defaultCenter={center}
        defaultZoom={12}
        streets={streets}
        polylineGeoCode = {polylineGeoCode}
        openRight = {openRight}
        setOpenRight = {setOpenRight}
        markerGeoCode = {markerGeoCode}
        rotation = {rotation}
      />
      </main>
    </div>
  );
}