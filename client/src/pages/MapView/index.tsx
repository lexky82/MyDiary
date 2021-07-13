import React, { useCallback, useState } from 'react'
import Googlemap from '../../components/Googlemap'

const MapView = () => {
    const [mapLocation, setMapLocation] = useState({});

    const containerStyle = {
        height : '100vh'
    }

    const googleMapLngChangeHandler = useCallback(
        (location: google.maps.MapMouseEvent) => {
          const latLng = {
            lat: location.latLng?.lat(),
            lng: location.latLng?.lng(),
          };
          setMapLocation({ ...latLng });
        },
        []
      );

    return (

        <Googlemap
            mapLngHandler={googleMapLngChangeHandler}
            mapLocation={mapLocation}
            containerStyle={containerStyle}
      />
    )
}

export default MapView
