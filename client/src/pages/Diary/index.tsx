import React, { useCallback, useState } from "react";

/* Lib */
import axios from "axios";
import locale from "antd/es/date-picker/locale/ko_KR";
import moment from "moment";
import "moment/locale/ko";

/* Components */
import { BiSend } from "react-icons/bi";
import Googlemap from "../../components/Googlemap";
import ImageUploader from "../../components/ImageUploader";
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
  const [weather, setweather] = useState("");
  const [contents, setContents] = useState("");
  const [mapLocation, setMapLocation] = useState({});
  const [images, setImages] = useState<Array<Blob>>([]);
  const [priviewImage, setPriviewImage] = useState<
    Array<string | ArrayBuffer | undefined | null>
  >([]);
  const [emotion, setEmotion] = useState("");

  const titleChangeHandler = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value);
    },
    []
  );

  const weatherClickHandler = useCallback((weather: string) => {
    setweather(weather);
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

  const imgUploaderChangeHandler = (image: Array<Blob>) => {
    imageReader(image);
    setImages([...image]);

    console.log(images);
  };

  const imageReader = (image: Array<Blob>) => {
    let imageURLs: Array<string | null | ArrayBuffer> = [];

    for (let i = 0; i < image.length; i++) {
      let file = image[i];
      let reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        imageURLs[i] = reader.result;
        setPriviewImage([...imageURLs]);
      };
    }
  };

  const onsubmitHandler = () => {
    const body = {
      date: date,
      title: title,
      wheather: weather,
      emotion: emotion,
      location: mapLocation,
      contents: contents,
      image: images,
    };

    axios
      .post("/api/diary", body)
      .then((response) => {
        if (response.data.success) {
          console.log("게시 완료!");
        }
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

      <SelectToday>
        <Sun onClick={() => weatherClickHandler("sun")} />
        <Cloud onClick={() => weatherClickHandler("cloud")} />
        <Rain onClick={() => weatherClickHandler("rain")} />
        <Snow onClick={() => weatherClickHandler("snow")} />
        <Lightning onClick={() => weatherClickHandler("lightning")} />
      </SelectToday>

      <SelectToday>
        <Happy onClick={() => setEmotion("happy")} />
        <Normal onClick={() => setEmotion("normal")} />
        <Unhappy onClick={() => setEmotion("unhappy")} />
        <Sad onClick={() => setEmotion("sad")} />
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

      <div style={{ display: "flex" }}>
        <ImageUploader imgUploaderChangeHandler={imgUploaderChangeHandler} />
        <div style={{ overflowX: "auto", height: "200px" }}>
          {priviewImage &&
            priviewImage.map((image, index) => (
              <img
                width={400}
                height={200}
                alt="UploadImage"
                key={index}
                src={priviewImage[index]?.toString()}
              />
            ))}
        </div>
      </div>

      <SubmitButton type="primary" icon={<BiSend />} onClick={onsubmitHandler}>
        작성
      </SubmitButton>
    </form>
  );
};

export default Diary;
