import React, { useCallback, useState } from "react";
import locale from "antd/es/date-picker/locale/ko_KR";
import { BiSend } from "react-icons/bi";
import moment from "moment";
import Googlemap from "../../components/Googlemap";
import ImageUploader from "react-images-upload";
import "moment/locale/ko";
import {
  Cloud,
  Content,
  Happy,
  Lightning,
  Normal,
  Rain,
  Sad,
  SelectedDatePicker,
  SelectWheater,
  Snow,
  SubmitButton,
  Sun,
  Title,
  Unhappy,
} from "./styles";
import axios from "axios";
import { Button, Input, Modal } from "antd";

const Diary = () => {
  const [date, setDate] = useState(moment());
  const [title, setTitle] = useState("");
  const [wheather, setWheather] = useState("");
  const [contents, setContents] = useState("");
  const [lng, setLng] = useState('');
  const [image, setImage] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
      .then(() => {})
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
        <Cloud onClick={() => wheaterClickHandler("cloud")} />
        <Rain id="rain" onClick={() => wheaterClickHandler("rain")} />
        <Snow id="snow" onClick={() => wheaterClickHandler("snow")} />
        <Lightning
          id="lightning"
          onClick={() => wheaterClickHandler("lightning")}
        />
      </SelectWheater>

      <SelectWheater>
        <Happy />
        <Normal />
        <Unhappy />
        <Sad />
      </SelectWheater>

      <SelectWheater>

        <Input disabled style={{ width : "30%" }} />

        <Button type="primary" onClick={showModal} >지도</Button>
        <Modal
          title="Map"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Googlemap />
        </Modal>
      </SelectWheater>
      <Content onChange={contentsChangeHandler} autoSize={{ minRows: 13 }} />

      <ImageUploader withIcon={true} />

      <SubmitButton type="primary" icon={<BiSend />} onSubmit={onsubmitHandler}>
        작성
      </SubmitButton>
    </form>
  );
};

export default Diary;
