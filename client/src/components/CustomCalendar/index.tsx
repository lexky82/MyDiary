import React from "react";

/* Lib */
import { Calendar } from "antd";
import locale from "antd/es/calendar/locale/ko_KR";

/* Components */
import dateCellRender from "./dateCellRender";

const CustomCalendar = () => (
  <Calendar
    locale={locale}
    dateCellRender={dateCellRender}
  />
);

export default CustomCalendar;
