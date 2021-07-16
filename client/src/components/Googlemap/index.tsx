import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const center = {
  lat: 37.54,
  lng: 127.04,
};

type props = {
  mapClickHandler: Function;
  mapLocation: any | Array<Object>;
  containerStyle: object;
  mapviewMarkerClickHandler : Function
};

const Googlemap = ({ mapClickHandler, mapLocation, containerStyle, mapviewMarkerClickHandler }: props) => {

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBnBqc7xRJzchvJALTI6m5qberlS0AOJK0"
      language="korean"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={4}
        onClick={(e) => mapClickHandler(e)}
      >
        {!Array.isArray(mapLocation) ? (
          <Marker position={mapLocation} />
        ) : (
          mapLocation.map((location: google.maps.LatLng, index: number) => (
            <Marker position={location} key={index} onClick={(e) => mapviewMarkerClickHandler(e)} />
          ))
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default React.memo(Googlemap);
