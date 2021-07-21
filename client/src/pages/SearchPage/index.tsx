import React from "react";
import { RouteComponentProps } from "react-router-dom";
import useSWR from "swr";
import DiaryList from "../../components/DiaryList";
import { diaryType } from "../../type";
import fetcher from "../../utils/fetcher";

interface MatchParams {
  searchtext: string;
}

const SearchPage = ({ match }: RouteComponentProps<MatchParams>) => {
  const { data } = useSWR(`/api/diary/`, fetcher);
  const searchText = match.params.searchtext;
  const diaryData: Array<diaryType> = data && data.diaryData;

  const filterDiary = () => {
    const result = diaryData.filter((diary) => {
      return diary.title.match(searchText) || diary.contents.match(searchText);
    });

    return result;
  };

  const searchDiary = filterDiary();
  return (
    <div>
      <div style={{ fontSize: "24px", padding: "20px", fontWeight: 600 }}>
        {`"${searchText}"`}의 검색 결과
      </div>
      <DiaryList selectedDiary={searchDiary} />
    </div>
  );
};

export default SearchPage;
