import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import useSWR from "swr";
import { RenderChart } from "../../pages/Mainpage/styles";
import { diaryType } from "../../type";
import fetcher from "../../utils/fetcher";

const DoughnutChart = () => {
  const { data } = useSWR(`/api/diary/`, fetcher);
  const [weatherCount, setweatherCount] = useState<Array<number>>([]);
  const [emotionCount, setemotionCount] = useState<Array<number>>([]);

  const diaryData: Array<diaryType> = data && data.diaryData;

  useEffect(() => {
    weatherCounter();
    emotionCounter();
  }, [diaryData]);

  const weatherCounter = () => {
    let weatherArray: Array<number> = [];
    let sun = 0;
    let cloud = 0;
    let rain = 0;
    let snow = 0;
    let lightning = 0;

    diaryData &&
      diaryData.map((diary) => {
        switch (diary.weather) {
          case "sun":
            sun += 1;
            break;
          case "cloud":
            cloud += 1;
            break;
          case "rain":
            rain += 1;
            break;
          case "snow":
            snow += 1;
            break;
          case "lightning":
            lightning += 1;
            break;

          default:
            break;
        }
      });

    weatherArray.push(sun);
    weatherArray.push(cloud);
    weatherArray.push(rain);
    weatherArray.push(snow);
    weatherArray.push(lightning);

    setweatherCount([...weatherArray]);
  };

  const emotionCounter = () => {
    let emotionArray: Array<number> = [];

    let happy = 0;
    let normal = 0;
    let unhappy = 0;
    let sad = 0;

    diaryData &&
      diaryData.map((diary) => {
        switch (diary.emotion) {
          case "happy":
            happy += 1;
            break;
          case "normal":
            normal += 1;
            break;
          case "unhappy":
            unhappy += 1;
            break;
          case "sad":
            sad += 1;
            break;

          default:
            break;
        }
      });

    emotionArray.push(happy);
    emotionArray.push(normal);
    emotionArray.push(unhappy);
    emotionArray.push(sad);

    setemotionCount([...emotionArray]);
  };

  const weatherData = {
    labels: ["Sun", "Cloud", "Rain", "Snow", "Lightning"],
    datasets: [
      {
        data: weatherCount && weatherCount,
        label: "# of Votes",
        backgroundColor: [
          "#ff0000",
          "#677486",
          "#4169e1",
          "#87ceeb",
          "#aeb404",
        ],
      },
    ],
  };

  const emotionData = {
    labels: ["Happy", "Normal", "Unhappy", "Sad"],
    datasets: [
      {
        data: emotionCount && emotionCount,
        label: "# of Votes",
        backgroundColor: ["#87ea07", "#a8adb4", "#7d7891", "#1872f9"],
      },
    ],
  };

  return (
    <RenderChart>
      <Doughnut data={weatherData} />
      <Doughnut data={emotionData} />
    </RenderChart>
  );
};

export default DoughnutChart;
