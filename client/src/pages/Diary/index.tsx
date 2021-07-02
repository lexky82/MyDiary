import React, { useCallback, useState } from "react";

/* Lib */
import axios from "axios";
import locale from "antd/es/date-picker/locale/ko_KR";
import moment from "moment";
import "moment/locale/ko";

/* Components */
import { BiSend } from "react-icons/bi";
import Googlemap from "../../components/Googlemap";
import ImageUploader from "../../components/ImageUploader"
import {
  Cloud,
  Content,
  Happy,
  Lightning,
  Normal,
  Rain,
  Sad,
  SelectedDatePicker,
  SelectToday,
  Snow,
  SubmitButton,
  Sun,
  Title,
  Unhappy,
} from "./styles";

const Diary = () => {
  const [date] = useState(moment());
  const [title, setTitle] = useState("");
  const [wheather, setWheather] = useState("");
  const [contents, setContents] = useState("");
  const [mapLocation, setMapLocation] = useState({});
  const [images, setImages] = useState<Array<{ key: number; value: object }>>(
    []
  );
  const titleChangeHandler = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value);
    },
    []
  );

  const wheaterClickHandler = useCallback((wheather: string) => {
    setWheather(wheather);
  }, []);

  const contentsChangeHandler = useCallback((e) => {
    setContents(e.currentTarget.value);
  }, []);

  const googleMapLngChangeHandler = useCallback(
    (location: google.maps.MapMouseEvent) => {
      const latLng = {
        lat: location.latLng?.lat(),
        lng: location.latLng?.lng(),
      };
      console.log(latLng);
      setMapLocation({ ...latLng });
    },
    []
  );

  const imgUploaderChangeHandler = (image: any) => {

    setImages({ ...image });
    console.log(images);
  };

  const deleteHandler = (image: any) => {
    const currentIndex = images.indexOf(image);
    console.log(currentIndex);

    const newImages = [...images];
    newImages.splice(currentIndex, 1);
    setImages(newImages);
  };

  const onsubmitHandler = () => {
    const body = {
      date: date,
      title: title,
      wheather: wheather,
      location: mapLocation,
      contents: contents,
      image: images,
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

      <SelectToday>
        <Sun id="sun" onClick={() => wheaterClickHandler("sun")} />
        <Cloud onClick={() => wheaterClickHandler("cloud")} />
        <Rain id="rain" onClick={() => wheaterClickHandler("rain")} />
        <Snow id="snow" onClick={() => wheaterClickHandler("snow")} />
        <Lightning
          id="lightning"
          onClick={() => wheaterClickHandler("lightning")}
        />
      </SelectToday>

      <SelectToday>
        <Happy />
        <Normal />
        <Unhappy />
        <Sad />
      </SelectToday>

      <Content
        onChange={contentsChangeHandler}
        autoSize={{ minRows: 15 }}
        placeholder="오늘의 이야기를 써볼까요?"
      />

      <Googlemap
        mapLngHandler={googleMapLngChangeHandler}
        mapLocation={mapLocation}
      />

      <div style={{ display:'flex'}}>
        <ImageUploader imgUploaderChangeHandler={imgUploaderChangeHandler} />
        <div>
          {
            images.map((image, index) => (
              <img src="" alt="" key={index}/>
            ))
          }
        </div>
      </div>
      
      <SubmitButton type="primary" icon={<BiSend />} onSubmit={onsubmitHandler}>
        작성
      </SubmitButton>
    </form>
  );
};

export default Diary;