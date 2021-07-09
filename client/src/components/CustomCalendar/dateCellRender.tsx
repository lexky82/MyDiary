import React from "react";
import moment from "moment";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import {
  Cloud,
  Lightning,
  Rain,
  Snow,
  Sun,
} from "../../utils/styles/weather_styledIcon";
import {
  Happy,
  Normal,
  Sad,
  Unhappy,
} from "../../utils/styles/emotion_styledIcon";

const DateCellRender = (value: moment.Moment) => {
  const { data } = useSWR("/api/diary/", fetcher);

  const getDayInfo = () => {
    const diaryData = data && data.diaryData;
    let calendarData;
    let diaryMoment;

    for (let i in diaryData) {
      diaryMoment = moment(diaryData[i].createdAt).format("YYYY-MM-DD");

      if (diaryMoment === value.format("YYYY-MM-DD")) {
        calendarData = [
          {
            weather: diaryData[i].weather,
            emotion: diaryData[i].emotion,
            content: diaryData[i].content,
          },
        ];
      }
    }

    return calendarData || [];
  };

  const WeatherRander = ({ weather }: { weather: string }) => {
    switch (weather) {
      case "sun":
        return <Sun weather="none" style={{ fontSize: "50px" }} />;
      case "cloud":
        return <Cloud weather="none" style={{ fontSize: "50px" }} />;
      case "rain":
        return <Rain weather="none" style={{ fontSize: "50px" }} />;
      case "snow":
        return <Snow weather="none" style={{ fontSize: "50px" }} />;
      case "lightning":
        return <Lightning weather="none" style={{ fontSize: "50px" }} />;
      default:
        return <div></div>;
    }
  };

  const EmotioinRender = ({ emotion }: { emotion: string }) => {
    switch (emotion) {
      case "happy":
        return <Happy emotion="none" style={{ fontSize: "50px" }} />;
      case "normal":
        return <Normal emotion="none" style={{ fontSize: "50px" }} />;
      case "unhappy":
        return <Unhappy emotion="none" style={{ fontSize: "50px" }} />;
      case "Sad":
        return <Sad emotion="none" style={{ fontSize: "50px" }} />;
      default:
        return <div></div>;
    }
  };

  const dayInfo = getDayInfo();

  return (
    <div>
      {dayInfo.map((info) => (
        <div>
          <WeatherRander weather={info.weather} />
          <EmotioinRender emotion={info.emotion} />
        </div>
      ))}
    </div>
  );
};

export default DateCellRender;
