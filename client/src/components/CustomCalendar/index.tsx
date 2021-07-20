import React, { useState } from "react";

/* Lib */
import { Button, Calendar, Modal } from "antd";
import locale from "antd/es/calendar/locale/ko_KR";

/* Components */
import dateCellRender from "./dateCellRender";
import moment from "moment";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { diaryType } from "../../type";
import DiaryList from "../DiaryList";

const CustomCalendar = () => {
  const { data } = useSWR(`/api/diary/`, fetcher);

  const [DateCellModal, setDateCellModal] = useState(false);
  const [selectDiary, setSelectDiary] = useState<Array<diaryType>>([]);

  const handleOk = () => {
    setDateCellModal(true);
  };

  const handleCancel = () => {
    setDateCellModal(false);
  };

  /* const DiaryModal = () => (
    <Modal
      visible={DateCellModal}
      title={selectDiary?.title}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          수정
        </Button>,
        <Button key="submit" type="primary" onClick={handleCancel}>
          확인
        </Button>,
      ]}
    >
      {selectDiary?.contents}
    </Modal>
  ); */

  const onSelectDateCell = (value: moment.Moment) => {
    const diaryData: Array<diaryType> = data && data.diaryData;

    const filterData = diaryData && diaryData.filter((data: any) => {
      return (
        moment(data.createdAt).format("YYYY-MM-DD") === value.format("YYYY-MM-DD")
      );
    });

    setSelectDiary(filterData);
    //filterData[0] && setDateCellModal(true);
  };

  return (
    <div>
      <Calendar
        locale={locale}
        dateCellRender={dateCellRender}
        onSelect={onSelectDateCell}
      />

      { /* <DiaryModal /> */ }
      <DiaryList selectedLocationDiary={selectDiary} />
    </div>
  );
};

export default CustomCalendar;
