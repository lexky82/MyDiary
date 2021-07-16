import React from "react";
import { Descriptions, PageHeader } from "antd";
import moment from "moment";
import 'moment/locale/ko'
import { Link } from "react-router-dom";
import { diaryType } from "../../type";
import {
  Happy,
  Normal,
  Sad,
  Unhappy,
} from "../../utils/styles/emotion_styledIcon";
import {
  Cloud,
  Lightning,
  Rain,
  Snow,
  Sun,
} from "../../utils/styles/weather_styledIcon";

type props = {
  diaryInfo: diaryType;
};

const HeadTitle = ({ diaryInfo }: props) => {
  const WeatherRander = ({ weather }: { weather: string }) => {
    switch (weather) {
      case "sun":
        return <Sun size="30px" weather="none" />;
      case "cloud":
        return <Cloud size="30px" weather="none" />;
      case "rain":
        return <Rain size="30px" weather="none" />;
      case "snow":
        return <Snow size="30px" weather="none" />;
      case "lightning":
        return <Lightning size="30px" weather="none" />;
      default:
        return <div></div>;
    }
  };

  const EmotioinRender = ({ emotion }: { emotion: string }) => {
    switch (emotion) {
      case "happy":
        return <Happy size="30px" emotion="none" />;
      case "normal":
        return <Normal size="30px" emotion="none" />;
      case "unhappy":
        return <Unhappy size="30px" emotion="none" />;
      case "sad":
        return <Sad size="30px" emotion="none" />;
      default:
        return <div></div>;
    }
  };

  return (
    <div  style={{ padding:'0px 5px'}}>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={diaryInfo.title}
        extra={[<Link to="2">수정</Link>, <Link to="1">삭제</Link>]}
      />
      <Descriptions style={{ marginBottom :'1.5rem'}} bordered >
        <Descriptions.Item label="제목">{diaryInfo.title}</Descriptions.Item>
        <Descriptions.Item label="그날의 날씨">{<WeatherRander weather={diaryInfo.weather} />}</Descriptions.Item>
        <Descriptions.Item label="그날의 감정">{<EmotioinRender emotion={diaryInfo.emotion} />}</Descriptions.Item>
        <Descriptions.Item label="작성일">{moment(diaryInfo.createdAt).format('LL dddd')}</Descriptions.Item>
        <Descriptions.Item label="최종 수정일">{moment(diaryInfo.updatedAt).format('LL dddd')}</Descriptions.Item>
        <Descriptions.Item label="장소">
          {diaryInfo.location.lat + ', ' + diaryInfo.location.lng}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default HeadTitle;
