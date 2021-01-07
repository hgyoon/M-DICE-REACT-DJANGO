import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import axios from 'axios';
import PersistentDrawerRight from './Drawer.jsx';
import MapDirectionsRenderer from './MapDirectionsRenderer';
import ReactMapillary from './reactMapillary';
import { useState } from 'react';
import { Button } from '@material-ui/core';

const Trigger = (props) => {
    async function makeArray(latLon){
        // console.log('latlon', latLon);
        let temp = [];
        for (var key in latLon){
            temp.push(latLon[key]['fields']);
            // console.log(latLon[key]['fields']);
        }
        props.onChange(temp);
    };
    async function makeArray2(data){
      props.onChange(data);
    }

    const handleChange = e => {
        console.log("handling submit:");
        axios
          .post("get_geoid")
          .then(res => {
            console.log(res.data);
            makeArray2(res.data);
          })
          .then(() =>{
            // console.log("Done");
          })
          .catch(function (error) {
            console.log(error);
          })
        e.preventDefault();
    }

    return (
        <div>
        <Button variant="contained" onClick={handleChange}>Trigger Backend</Button>
        </div>
    );
}

export default Trigger;