import React, { useCallback, useEffect, useState } from "react";

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
} from "../Diary/styles";
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
import { diaryType } from "../../type";

interface MatchParams {
  diaryid: string;
}

const UpdateDiary = ({ match, history }: RouteComponentProps<MatchParams>) => {
  const diaryid = match.params.diaryid;
  const { data, revalidate } = useSWR(`/api/diary/`, fetcher);

  const [date, setDate] = useState(moment());
  const [title, setTitle] = useState("");
  const [weather, setweather] = useState("");
  const [emotion, setEmotion] = useState("");
  const [contents, setContents] = useState("");
  const [mapLocation, setMapLocation] = useState({});
  const [images, setImages] = useState<
    Array<{ path : string}>
  >([]);

  useEffect(() => {
    if (!data && !diaryid) {
      return;
    }

    const diary = diaryFilter();
    setDate(moment(diary.createdAt));
    setTitle(diary.title);
    setweather(diary.weather);
    setEmotion(diary.emotion);
    setContents(diary.contents);
    setMapLocation(diary.location);
    setImages(diary.image)
  }, [data, diaryid]);

  const diaryFilter = () => {
    const diaryData: Array<diaryType> = data && data.diaryData;

    const selectDiary = diaryData.filter((diary) => {
      return diary._id === diaryid;
    });

    return selectDiary[0];
  };

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
  };

  const imageReader = (image: Array<Blob>) => {
    let imageURLs: Array<string | null | ArrayBuffer> = [];

    for (let i = 0; i < image.length; i++) {
      let file = image[i];
      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        imageURLs[i] = reader.result;
      };
    }
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

    const body = {
      _id: diaryid,
      date: date,
      title: title,
      weather: weather,
      emotion: emotion,
      location: mapLocation,
      contents: contentsReplaceNewline(),
      image: images,
    };

    axios
      .put("/api/diary/", body)
      .then((response) => {
        if (response.data.success) {
          revalidate();
          openNotification("일기 작성완료!", "일기를 저장하였습니다.", true);
          history.goBack();
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
        value={date}
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
        value={contents}
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
          {images &&
            images.map((image, index) => (
              <img
                width={400}
                height={200}
                alt="UploadImage"
                key={index}
                src={`http://localhost:5000/${images[index].path}`}
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

export default withRouter(UpdateDiary);
