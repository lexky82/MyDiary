import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";

const center = {
  lat: 37.54,
  lng: 127.04,
};

type props = {
  mapClickHandler: Function;
  mapLocation: any | Array<Object>;
  containerStyle: object;
  mapviewMarkerClickHandler: Function;
};

const Googlemap = ({
  mapClickHandler,
  mapLocation,
  containerStyle,
  mapviewMarkerClickHandler,
}: props) => {
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox>();
  const [boundsLatLng, setBoundsLatLng] = useState<google.maps.LatLng>()

  const onLoad = (ref: google.maps.places.SearchBox) => setSearchBox(ref);
  const onPlacesChanged = () => console.log(searchBox?.getPlaces());

  const onBounds = () => {
  }

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBnBqc7xRJzchvJALTI6m5qberlS0AOJK0"
      language="ko"
      libraries={["places"]}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={4}
        onClick={(e) => mapClickHandler(e)}
      >
        <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged} bounds={boundsLatLng}>
          <input
            type="text"
            placeholder="검색"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "50%",
              marginLeft: "-120px",
            }}
          />
        </StandaloneSearchBox>

        {!Array.isArray(mapLocation) ? (
          <Marker position={mapLocation} />
        ) : (
          mapLocation.map((location: google.maps.LatLng, index: number) => (
            <Marker
              position={location}
              key={index}
              onClick={(e) => mapviewMarkerClickHandler(e)}
            />
          ))
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default React.memo(Googlemap);
