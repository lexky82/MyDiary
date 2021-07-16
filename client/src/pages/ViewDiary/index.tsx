import React from "react";
import { RouteComponentProps } from "react-router-dom";
import useSWR from "swr";
import HeadTitle from "../../components/HeadTitle";
import ImageSlider from "../../components/ImageSlider";
import { diaryType } from "../../type";
import fetcher from "../../utils/fetcher";

interface MatchParams {
  diaryid: string;
}

const ViewDiary = ({ match }: RouteComponentProps<MatchParams>) => {
  const diaryId = match.params.diaryid;

  const { data: loginData } = useSWR("/api/users/auth", fetcher);
  const { data } = useSWR(`/api/diary/${loginData._id}`, fetcher);

  const diaryFilter = () => {
    const diaryData: Array<diaryType> = data && data.diaryData;

    const selectDiary = diaryData.filter((diary) => {
      return diary._id === diaryId;
    });

    return selectDiary[0];
  };

  const diary = diaryFilter();

  return (
    <div>
      <HeadTitle diaryInfo={diary} />
      {diary.image[0] && <ImageSlider images={diary.image} />}

      <div style={{ padding : '10px'}}>{diary.contents}</div>
      
    </div>
  );
};

export default ViewDiary;
