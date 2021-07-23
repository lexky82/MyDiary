import React, { useCallback, useState } from "react";

/* Lib */
import axios from "axios";
import { RouteComponentProps, withRouter } from "react-router-dom";
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
  Content,
  FlexBox,
  ImageBox,
  SelectedDatePicker,
  SelectToday,
  SubmitButton,
  Title,
} from "./styles";
import {
  Happy,
  Normal,
  Sad,
  Unhappy,
} from "../../utils/styles/emotion_styledIcon";
import {
  Cloud,
  Lightning,
  Rain,
  Snow,
  Sun,
} from "../../utils/styles/weather_styledIcon";
import openNotification from "../../components/Notification";

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
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    return formData;
  };

  const onsubmitHandler = () => {
    if (!title || !contents) {
      openNotification(
        "일기 작성실패",
        "제목과 내용은 필수로 입력해야합니다.",
        false
      );
      return;
    }

    const contentsReplaceNewline = () => {
      return contents.replaceAll("<br>", "\r\n");
    };

    const formData = imageUploadHandler()

    const body = {
      writer: data._id,
      date: date,
      title: title,
      weather: weather,
      emotion: emotion,
      location: mapLocation,
      contents: contentsReplaceNewline(),
    };
    
    formData.append('body', JSON.stringify(body));

    axios
      .post("/api/diary/", formData)
      .then((response) => {
        if (response.data.success) {
          openNotification("일기 작성완료!", "일기를 저장하였습니다.", true);
          history.push("/");
        }
      })
      .catch((err) => {
        openNotification("일기 작성실패!", err.toString(), false);
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
        <Sun
          size="40px"
          weather={weather}
          onClick={() => weatherClickHandler("sun")}
        />
        <Cloud
          size="40px"
          weather={weather}
          onClick={() => weatherClickHandler("cloud")}
        />
        <Rain
          size="40px"
          weather={weather}
          onClick={() => weatherClickHandler("rain")}
        />
        <Snow
          size="40px"
          weather={weather}
          onClick={() => weatherClickHandler("snow")}
        />
        <Lightning
          size="40px"
          weather={weather}
          onClick={() => weatherClickHandler("lightning")}
        />
      </SelectToday>

      <SelectToday>
        <Happy
          size="40px"
          emotion={emotion}
          onClick={() => setEmotion("happy")}
        />
        <Normal
          size="40px"
          emotion={emotion}
          onClick={() => setEmotion("normal")}
        />
        <Unhappy
          size="40px"
          emotion={emotion}
          onClick={() => setEmotion("unhappy")}
        />
        <Sad size="40px" emotion={emotion} onClick={() => setEmotion("sad")} />
      </SelectToday>

      <Content
        onChange={contentsChangeHandler}
        autoSize={{ minRows: 15 }}
        placeholder="오늘의 이야기를 써볼까요?"
      />

      <Googlemap
        containerStyle={{ height: "400px" }}
        mapClickHandler={googleMapLngChangeHandler}
        mapviewMarkerClickHandler={() => {}}
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
