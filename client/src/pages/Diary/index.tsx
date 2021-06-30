import React, { useCallback, useState } from "react";
import locale from "antd/es/date-picker/locale/ko_KR";
import { BiSend } from "react-icons/bi";
import moment from "moment";
import "moment/locale/ko";
import {
  Content,
  Lightning,
  Rain,
  SelectedDatePicker,
  SelectWheater,
  Snow,
  SubmitButton,
  Sun,
  Title,
} from "./styles";
import axios from "axios";

const Diary = () => {
  const [date, setDate] = useState(moment());
  const [title, setTitle] = useState("");
  const [wheather, setWheather] = useState("");
  const [contents, setContents] = useState("");

  const titleChangeHandler = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value);
    },
    [setTitle]
  );

  const wheaterClickHandler = useCallback(
    (wheather: string) => {
      setWheather(wheather);
    },
    [setWheather]
  );

  const contentsChangeHandler = useCallback(
    (e) => {
      setContents(e.currentTarget.value);
    },
    [setContents]
  );

  const onsubmitHandler = () => {
    const body = {
      date: date,
      title: title,
      wheather: wheather,
      contents: contents,
    };

    axios
      .post("/api/diary/diary", body)
      .then(() => {
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmitCapture={onsubmitHandler}>
      <SelectedDatePicker
        locale={locale}
        format="LL dddd"
        defaultValue={date}
        disabled
      />

      <Title placeholder="제목" onChange={titleChangeHandler} value={title} />

      <SelectWheater>
        <Sun id="sun" onClick={() => wheaterClickHandler("sun")} />
        <Rain id="rain" onClick={() => wheaterClickHandler("rain")} />
        <Snow id="snow" onClick={() => wheaterClickHandler("snow")} />
        <Lightning
          id="lightning"
          onClick={() => wheaterClickHandler("lightning")}
        />
      </SelectWheater>

      <Content onChange={contentsChangeHandler} autoSize={{ minRows: 13 }} />

      <SubmitButton type="primary" icon={<BiSend />} onSubmit={onsubmitHandler}>
        작성
      </SubmitButton>
    </form>
  );
};

export default Diary;
