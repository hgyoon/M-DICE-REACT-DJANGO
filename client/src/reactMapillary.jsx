import React, {useEffect, useState} from 'react';
import {MapillaryViewer} from 'react-mapillary';

export const ReactMapillary = (props) => {
  const [visible, setVisible] = useState(props.visible);
  const handleKeyDown = (event) => {
    if (event.key === 'h') {
      setVisible(!visible);
    }
  };
  return (
    <div
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex="-1"
      style={{
        width: '100%',
        height: '80vh',
      }}
    >
      {props.visible &&
        <MapillaryViewer
          clientId="QjI1NnU0aG5FZFZISE56U3R5aWN4Zzo3NTM1MjI5MmRjODZlMzc0"
          imageKey= {props.imgKey}
          filter={['==', 'userKey', '2PiRXqdqbY47WzG6CRzEIA']}
          onTiltChanged={tilt => console.log(`Tilt: ${tilt}`)}
          onFovChanged={fov => console.log(`FoV: ${fov}`)}
          onNodeChanged={node => {console.log(node.latLon); props.setMarkerGeoCode({lat: node.latLon.lat, lng: node.latLon.lon})}}
          onBearingChanged={bearing => console.log(`Bearing: ${bearing}`)}
        />
        }
    </div>
  );
};

export default ReactMapillary;