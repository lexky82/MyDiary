import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  height: '200px'
};

const center = {
  lat: 37.54,
  lng: 127.04
};

type props = {
  mapLngHandler : Function,
  mapLocation : any,
}

const Googlemap = ({ mapLngHandler, mapLocation }: props) => {

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBnBqc7xRJzchvJALTI6m5qberlS0AOJK0"
      language="korean"
      
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        
        onClick={e => mapLngHandler(e)}
      >
        <Marker
          position={mapLocation}
        />
        
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Googlemap)