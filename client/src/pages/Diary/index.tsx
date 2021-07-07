import React, { useCallback, useState } from "react";

/* Lib */
import axios from "axios";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
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
  FlexBox,
  Happy,
  ImageBox,
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
import { RouteComponentProps, withRouter } from "react-router-dom";

const Diary = ({ history }: RouteComponentProps) => {
  const { data } = useSWR("/api/users/auth", fetcher);
  const [date] = useState(moment());
  const [title, setTitle] = useState("");
  const [weather, setweather] = useState("");
  const [emotion, setEmotion] = useState("");
  const [contents, setContents] = useState("");
  const [mapLocation, setMapLocation] = useState({});
  const [images, setImages] = useState<Array<Blob>>([]);
  const [priviewImage, setPriviewImage] = useState<
    Array<string | ArrayBuffer | undefined | null>
  >([]);

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
      setMapLocation({ ...latLng });
    },
    []
  );

  const imgUploaderChangeHandler = (image: Array<Blob>) => {
    imageReader(image);
    setImages([...image]);
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

  const imageUploadHandler = () => {
    const formData = new FormData();

    for (let count in images) {
      formData.append("images", images[count]);
    }

    return formData;
  };

  const onsubmitHandler = () => {
    const contentsReplaceNewline = () => {
      return contents.replaceAll("<br>", "\r\n");
    };

    const body = {
      writer: data._id,
      date: date,
      title: title,
      wheather: weather,
      emotion: emotion,
      location: mapLocation,
      content: contentsReplaceNewline(),
      image: images,
    };

    const imageFile = imageUploadHandler();

    axios.post("/api/diary/", imageFile).catch((err) => {
      // 서버 이미지 업로드
      console.log(err);
    });

    axios
      .post("/api/diary/", body)
      .then((response) => {
        if (response.data.success) {
          history.push("/");
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
        <Sun weather={weather} onClick={() => weatherClickHandler("sun")} />
        <Cloud weather={weather} onClick={() => weatherClickHandler("cloud")} />
        <Rain weather={weather} onClick={() => weatherClickHandler("rain")} />
        <Snow weather={weather} onClick={() => weatherClickHandler("snow")} />
        <Lightning
          weather={weather}
          onClick={() => weatherClickHandler("lightning")}
        />
      </SelectToday>

      <SelectToday>
        <Happy emotion={emotion} onClick={() => setEmotion("happy")} />
        <Normal emotion={emotion} onClick={() => setEmotion("normal")} />
        <Unhappy emotion={emotion} onClick={() => setEmotion("unhappy")} />
        <Sad emotion={emotion} onClick={() => setEmotion("sad")} />
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

      <FlexBox>
        <ImageUploader imgUploaderChangeHandler={imgUploaderChangeHandler} />
        <ImageBox>
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
        </ImageBox>
      </FlexBox>

      <SubmitButton type="primary" icon={<BiSend />} onClick={onsubmitHandler}>
        작성
      </SubmitButton>
    </form>
  );
};

export default withRouter(Diary);
