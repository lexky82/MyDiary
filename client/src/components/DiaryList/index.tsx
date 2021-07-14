import { List, Avatar, Space } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { diaryType } from "../../type";
import fetcher from "../../utils/fetcher";

type iconType = {
  icon: any;
  text: string;
};

type listType = {
  href: string;
  title: string;
  avatar: string;
  description: string;
  content: string;
};

const DiaryList = () => {
  const { data } = useSWR("/api/diary/", fetcher);
  const diaryData: Array<diaryType> = data && data.diaryData;
  const listData: Array<listType> = [];

  diaryData && diaryData.map((diary) => {
    listData.push({
      href: "https://ant.design",
      title: diary.title,
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      description: moment(diary.createdAt).format("YYYY-MM-DD"),
      content: diary.contents,
    });
  });

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 3,
      }}
      dataSource={listData}
      footer={
        <div>
          <b>MyDiary</b> footer part
        </div>
      }
      renderItem={(item) => (
        <List.Item
          extra={
            <img
              width={252}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={<Link to={item.href}>{item.title}</Link>}
            description={item.description} // 소제목
          />
          {item.content}
        </List.Item>
      )}
    />
  );
};

export default DiaryList;
