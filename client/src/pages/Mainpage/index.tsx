import React, { useEffect } from "react";
import useSWR from "swr";
import DoughnutChart from "../../components/DoughnutChart";
import CleanData from "../../components/CleanData";
import { diaryType } from "../../type";
import fetcher from "../../utils/fetcher";
import EditIcon from "@material-ui/icons/Edit";
import TodayIcon from "@material-ui/icons/Today";
import ImageIcon from "@material-ui/icons/Image";
import TextFormatIcon from "@material-ui/icons/TextFormat";
import { Container, RenderChart, SectionTitle } from "./styles";
import { useState } from "react";
import moment from "moment";
import DiaryList from "../../components/DiaryList";

const Mainpage = () => {
  const { data } = useSWR(`/api/diary/`, fetcher);

  const [diaryCount, setDiaryCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [imageCount, setImageCount] = useState(0);
  const [charactersCount, setCharactersCount] = useState(0);
  const diaryData: Array<diaryType> = data && data.diaryData;

  useEffect(() => {
    if (!diaryData) {
      return;
    }

    setDiaryCount(diaryData.length);
    todayDiaryCount();
    uploadImageCount();
    uploadCharactersCount();
  }, [diaryData]);

  const todayDiaryCount = () => {
    const result = diaryData.filter((diary) => {
      return (
        moment(diary.createdAt).format("YYYY-MM-DD") ===
        moment().format("YYYY-MM-DD")
      );
    });

    setTodayCount(result.length);
  };

  const uploadImageCount = () => {
    let count = 0;

    diaryData.map((diary) => {
      count += diary.image.length;
    });

    setImageCount(count);
  };

  const uploadCharactersCount = () => {
    let count = 0;

    diaryData.map((diary) => {
      count += diary.contents.length;
    });

    setCharactersCount(count);
  };

  return (
    <div style={{ paddingTop: "1rem" }}>
      <SectionTitle>CleanData</SectionTitle>

      <Container>
        <CleanData
          Icon={EditIcon}
          count={diaryCount}
          explanation={"총 작성한 일기"}
        />
        <CleanData
          Icon={TodayIcon}
          count={todayCount}
          explanation={"오늘 작성한 일기"}
        />
        <CleanData
          Icon={ImageIcon}
          count={imageCount}
          explanation={"총 업로드한 이미지"}
        />
        <CleanData
          Icon={TextFormatIcon}
          count={charactersCount}
          explanation={"작성한 일기의 글자"}
        />
      </Container>

      <SectionTitle>Chart</SectionTitle>

      <DoughnutChart />

      <SectionTitle>All Diary</SectionTitle>
      <DiaryList selectedDiary={diaryData} />
    </div>
  );
};

export default Mainpage;
