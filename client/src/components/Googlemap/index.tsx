import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { SearchBox } from "./styles";

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
  const [boundsLatLng, setBoundsLatLng] = useState<
    google.maps.LatLngBounds | undefined
  >();

  const onLoad = (ref: google.maps.places.SearchBox) => setSearchBox(ref);

  const onPlaceChangeHandler = () => {
    const places = searchBox?.getPlaces();
    places?.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        return;
      }
      else{
        const boundsLocation = new google.maps.LatLngBounds(place.geometry.location)
        setBoundsLatLng(boundsLocation)
      }
    })
    
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
        <StandaloneSearchBox
          onLoad={onLoad}
          onPlacesChanged={onPlaceChangeHandler}
          bounds={boundsLatLng}
        >
          <SearchBox
            type="text"
            placeholder="위치 검색"
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
