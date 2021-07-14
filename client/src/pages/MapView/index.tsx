import React from "react";
import useSWR from "swr";
import DiaryList from "../../components/DiaryList";
import Googlemap from "../../components/Googlemap";
import { diaryType } from "../../type";
import fetcher from "../../utils/fetcher";

const MapView = () => {
  const { data } = useSWR("/api/diary/", fetcher);
  const diaryData: Array<diaryType> = data && data.diaryData;
  const locationData: Array<Object> = [];

  diaryData && diaryData.map(diary => {
    locationData.push(diary.location);
  })

  console.log(locationData)

  const containerStyle = {
    height: "70vh",
  };

  const googleMapLngChangeHandler = () => {

  }

  return (
    <div>
      <Googlemap
        mapClickHandler={googleMapLngChangeHandler}
        mapLocation={locationData}
        containerStyle={containerStyle}
      />

      <DiaryList />
    </div>
  );
};

export default MapView;
