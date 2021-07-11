import React from "react";

/* Lib */
import { Calendar } from "antd";
import locale from "antd/es/calendar/locale/ko_KR";

/* Components */
import dateCellRender from "./dateCellRender";
import onSelectDateCell from "./onSelectDateCell"

const CustomCalendar = () => (
  <Calendar
    locale={locale}
    dateCellRender={dateCellRender}
    onSelect={onSelectDateCell}
  />
);

export default CustomCalendar;
