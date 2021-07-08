import React from "react";
import moment from "moment";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";

const DateCellRender = () => {
  const { data: diaryData } = useSWR("/api/diary/", fetcher);

  const getDiaryData = () => {
    let diaryCellData;

    switch (diaryData.createdAt.toDate()) {
      case 1:
        diaryCellData = [
          {
            type: "warning",
            content: diaryData.contents,
          },
        ];
        break;

      default:
        break;
    }

    return diaryCellData || [];
  };

  const listData = getDiaryData();

  return (
    <ul>
      {listData.map((item) => (
        <li key={item.content}>
        </li>
      ))}
    </ul>
  );
};

export default DateCellRender;
