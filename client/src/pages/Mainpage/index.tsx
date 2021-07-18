import React from "react";
import DoughnutChart from "../../components/DoughnutChart";
import {
  emotionData,
  weatherData,
} from "../../components/DoughnutChart/chartData";
import { RenderChart } from "./styles";

const Mainpage = () => {
  return (
    <div>
      <RenderChart>
        <DoughnutChart data={weatherData} />
        <DoughnutChart data={emotionData} />
      </RenderChart>
    </div>
  );
};

export default Mainpage;
