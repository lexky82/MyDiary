import React, { useState } from "react";
import useSWR from "swr";
import DiaryList from "../../components/DiaryList";
import Googlemap from "../../components/Googlemap";
import { diaryType } from "../../type";
import fetcher from "../../utils/fetcher";

const MapView = () => {
  const { data: loginData } = useSWR("/api/users/auth", fetcher);
  const { data } = useSWR(`/api/diary/${loginData._id}`, fetcher);
  const diaryData: Array<diaryType> = data && data.diaryData;
  const [listData, setlistData] = useState<Array<diaryType>>([]);

  const locationListPush = () => {
    const locationData: Array<Object> = [];

    diaryData &&
      diaryData.map((diary) => {
        locationData.push(diary.location);
      });

    return locationData;
  };

  const containerStyle = {
    height: "70vh",
  };

  const mapviewMarkerClickHandler = (e: google.maps.MapMouseEvent) => {
    const latLng = {
      lat: e.latLng?.lat(),
      lng : e.latLng?.lng()
    };

    const result = diaryData.filter((diary) => {
      return JSON.stringify(latLng) === JSON.stringify(diary.location)
    })

    setlistData([...result])
  };

  return (
    <div>
      <Googlemap
        mapviewMarkerClickHandler={mapviewMarkerClickHandler}
        mapClickHandler={() => {}}
        mapLocation={locationListPush()}
        containerStyle={containerStyle}
      />

      <DiaryList selectedLocationDiary={listData} />
    </div>
  );
};

export default MapView;
