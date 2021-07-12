import React, { useEffect } from "react";

/* Lib */

/* Components */
import CustomCalendar from "../../components/CustomCalendar";
import DoughnutChart from "../../components/DoughnutChart";

const Calendar = () => {
  return (
    <div>
      <DoughnutChart />
      <CustomCalendar />
    </div>
  );
};

export default Calendar;
