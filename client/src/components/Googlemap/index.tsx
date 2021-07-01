import React from 'react'
import { GoogleMap, GoogleMapProps, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '450x',
  height: '450px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const mapClickHandler = (e: any) => {
    console.log(e);
}

function Googlemap() {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBnBqc7xRJzchvJALTI6m5qberlS0AOJK0"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={mapClickHandler}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Googlemap)