import { Button, Modal } from "antd";
import moment from "moment";
import React, { useState } from "react";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";

const OnSelectDateCell = (value: moment.Moment) => {
  const { data } = useSWR("/api/diary/", fetcher);
  const [visible, setVisible] = useState(false);

  type datas = {
    createdAt: string;
  };

  const handleOk = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const openModal = () => {
    <Modal
      visible={visible}
      title="일기"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          수정
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          확인
        </Button>,
      ]}
    >
      <p>{diaryFilter()}</p>
    </Modal>;
  };

  const diaryFilter = () => {
    const diaryData = data && data.diaryData;

    const selectDiary = diaryData.filter((datas: datas) => {
      return (
        moment(datas.createdAt).format("YYYY-MM-DD") ===
        value.format("YYYY-MM-DD")
      );
    });

    return selectDiary;
  };

  return <div></div>;
};

export default OnSelectDateCell;
