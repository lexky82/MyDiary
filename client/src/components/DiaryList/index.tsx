import { List, Avatar, Space, Skeleton, Spin } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { diaryType } from "../../type";
import fetcher from "../../utils/fetcher";
import { Thumbnail } from "./styles";

type listType = {
  href: string;
  title: string;
  description: string;
  content: string;
  image: string;
};

const DiaryList = () => {
  const { data: loginData } = useSWR("/api/users/auth", fetcher);
  const { data } = useSWR(`/api/diary/${loginData._id}`, fetcher);

  const diaryListPush = () => {
    const diaryData: Array<diaryType> = data && data.diaryData;
    const listData: Array<listType> = [];

    diaryData &&
      diaryData.map((diary) => {
        listData.push({
          href: `/viewdiary/${diary._id}`,
          title: diary.title,
          description: moment(diary.createdAt).format("YYYY-MM-DD"),
          content: diary.contents,
          image: diary.image[0],
        });
      });

    return listData;
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
        dataSource={diaryListPush()}
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
