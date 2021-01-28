
import React from 'react';
import {
    Polygon,
  } from 'react-google-maps';

export const InnerBorder = (props) => {
    return(
        <Polygon
          path={[
            { lng:-83.118804, lat: 42.415885},
            { lng:-83.100779, lat: 42.391230},
            { lng:-83.072391, lat: 42.400184},
            { lng:-83.065588, lat: 42.391880},
            { lng:-83.061211, lat: 42.393465},
            { lng:-83.053379, lat: 42.383401},
            { lng:-83.044281, lat: 42.386222},
            { lng:-83.046727, lat: 42.390977},
            { lng:-83.044152, lat: 42.392150},
            { lng:-83.043809, lat: 42.403274},
            { lng:-83.054967, lat: 42.402798},
            { lng:-83.058014, lat: 42.407013},
            { lng:-83.077970, lat: 42.400612},
            { lng:-83.091574, lat: 42.416170},
          ]}
          options = {{
            strokeColor: '#FF3D00',
            strokeWeight: 1,
            fillColor: "#808080",
            fillOpacity: 0.2,
          }}
        />
    )
}

export default InnerBorder;