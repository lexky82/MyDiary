import { Button, List } from "antd";
import moment from "moment";
import 'moment/locale/ko'
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { diaryType } from "../../type";
import { Happy, Normal, Sad, Unhappy } from "../../utils/styles/emotion_styledIcon";
import { Cloud, Lightning, Rain, Snow, Sun } from "../../utils/styles/weather_styledIcon";
import { Thumbnail } from "./styles";

type listType = {
  href: string;
  title: string;
  description: string;
  content: string;
  image: string;
  weather : string,
  emotion : string,
};

type props ={
  selectedLocationDiary: Array<diaryType>
}

const DiaryList = ({selectedLocationDiary}: props) => {
  const [renderDiary, setRenderDiary] = useState<Array<listType>>([]);

  useEffect(() => {
    setRenderDiary(diaryToList(selectedLocationDiary))

  }, [selectedLocationDiary])

  const diaryToList = (RenderListDiary: Array<diaryType>) => {
    const listData: Array<listType> = [];

    RenderListDiary && RenderListDiary.map((diary) => {
        listData.push({
          href: `/viewdiary/${diary._id}`,
          title: diary.title,
          description: moment(diary.createdAt).format("YYYY-MM-DD"),
          content: textLengthOverCut(diary.contents, 60, "..."),
          image: diary.image[0],
          weather: diary.weather,
          emotion : diary.emotion,
        });
      });

    return [...listData];
  };

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

  const textLengthOverCut = (text: string, len: number, lastTxt: string) => {
    if (text.length > len) {
      text = text.substr(0, len) + lastTxt;
    }

    return text;
  };

  return (
    <div>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
          position: "bottom",
        }}
        dataSource={renderDiary}
        renderItem={(item) => (
          <List.Item
            actions={[
              <WeatherRander weather={item.weather} />,
              <EmotioinRender emotion={item.emotion} />
            ]}
            extra={item.image && <Thumbnail alt="thumbnail" src={item.image} />}
          >
            <List.Item.Meta
              title={<Link to={item.href}>{item.title}</Link>}
              description={item.description} // 소제목
            />
            {item.content}
          </List.Item>
        )}
      />
    </div>
  );
};

export default DiaryList;
