import { List } from "antd";
import moment from "moment";
import 'moment/locale/ko'
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { diaryType } from "../../type";
import { Thumbnail } from "./styles";

type listType = {
  href: string;
  title: string;
  description: string;
  content: string;
  image: string;
};

type props ={
  selectedLocationDiary: Array<diaryType>
}

const DiaryList = ({selectedLocationDiary}: props) => {
  const [renderDiary, setRenderDiary] = useState<Array<listType>>([]);

  useEffect(() => {
    setRenderDiary(diaryToList(selectedLocationDiary))

  }, [selectedLocationDiary])

  const diaryToList = (RenderListDiary: Array<diaryType>) => {
    const listData: Array<listType> = [];

    RenderListDiary && RenderListDiary.map((diary) => {
        listData.push({
          href: `/viewdiary/${diary._id}`,
          title: diary.title,
          description: moment(diary.createdAt).format("YYYY-MM-DD"),
          content: textLengthOverCut(diary.contents, 60, "..."),
          image: diary.image[0],
        });
      });

    return [...listData];
  };

  const textLengthOverCut = (text: string, len: number, lastTxt: string) => {
    if (text.length > len) {
      text = text.substr(0, len) + lastTxt;
    }

    return text;
  };

  return (
    <div>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
          position: "bottom",
        }}
        dataSource={renderDiary}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Link to="list-loadmore-edit">수정</Link>,
              <Link to="list-loadmore-more">삭제</Link>,
            ]}
            extra={item.image && <Thumbnail alt="thumbnail" src={item.image} />}
          >
            <List.Item.Meta
              title={<Link to={item.href}>{item.title}</Link>}
              description={item.description} // 소제목
            />
            {item.content}
          </List.Item>
        )}
      />
    </div>
  );
};

export default DiaryList;
