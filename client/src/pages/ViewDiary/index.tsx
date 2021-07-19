import React from "react";
import axios from "axios";
import { RouteComponentProps } from "react-router-dom";
import useSWR from "swr";
import HeadTitle from "../../components/HeadTitle";
import ImageSlider from "../../components/ImageSlider";
import openNotification from "../../components/Notification";
import { diaryType } from "../../type";
import fetcher from "../../utils/fetcher";

interface MatchParams {
  diaryid: string;
}

const ViewDiary = ({ match, history }: RouteComponentProps<MatchParams>) => {
  const diaryId = match.params.diaryid;

  const { data: loginData } = useSWR("/api/users/auth", fetcher);
  const { data, revalidate } = useSWR(`/api/diary/${loginData._id}`, fetcher);

  const diaryFilter = () => {
    const diaryData: Array<diaryType> = data && data.diaryData;

    const selectDiary = diaryData.filter((diary) => {
      return diary._id === diaryId;
    });

    return selectDiary[0];
  };

  const updateDiary = () => {
    history.push(`/updatediary/${diaryId}`);
  };

  const removeDiary = () => {
    const body = {
      _id: diaryId,
    };

    axios
      .put("/api/diary/removediary", body)
      .then(() => {
        openNotification(
          "일기 삭제",
          "일기를 성공적으로 삭제하였습니다.",
          true
        );
        revalidate();
        history.push("/");
      })
      .catch((err) => {
        openNotification("삭제 실패", err.toString(), false);
      });
  };

  const diary = diaryFilter();

  return (
    <div>
      <HeadTitle
        diaryInfo={diary}
        updateDiary={updateDiary}
        removeDiary={removeDiary}
      />
      {diary.image[0] && <ImageSlider images={diary.image} />}

      <div style={{ fontSize: "18px", padding: "10px" }}>{diary.contents}</div>
    </div>
  );
};

export default ViewDiary;
