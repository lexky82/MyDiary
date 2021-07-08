import React, { useEffect } from "react";

/* Lib */
import { Calendar } from "antd";
import locale from "antd/es/calendar/locale/ko_KR";
import dateCellRender from "./dateCellRender";

/* Components */

const CustomCalendar = () => {
  return (
    <div>
      <Calendar locale={locale} dateCellRender={dateCellRender} />
    </div>
  );
};

export default CustomCalendar;