import React from "react";
import { RouteComponentProps } from "react-router-dom";
import useSWR from "swr";
import ImageSlider from "../../components/ImageSlider";
import { diaryType } from "../../type";
import fetcher from "../../utils/fetcher";

interface MatchParams {
  diaryid: string;
}

const ViewDiary = ({ match }: RouteComponentProps<MatchParams>) => {
  const diaryId = match.params.diaryid;
  const { data } = useSWR("/api/diary/", fetcher);

  const diaryFilter = () => {
    const diaryData: Array<diaryType> = data && data.diaryData;

    const selectDiary = diaryData.filter((diary) => {
      return diary._id === diaryId;
    });

    return selectDiary[0];
  };

  const diaryImage = diaryFilter().image;

  return (
    <div>
        <ImageSlider images={diaryImage} />
    </div>
    
  )  
};

export default ViewDiary;
