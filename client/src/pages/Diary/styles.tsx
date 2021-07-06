import styled from "@emotion/styled";
import { Button, DatePicker, Input } from "antd";
import {
  BiCloud,
  BiCloudLightning,
  BiCloudRain,
  BiCloudSnow,
  BiSun,
} from "react-icons/bi";
import {
  RiEmotionHappyLine,
  RiEmotionNormalLine,
  RiEmotionUnhappyLine,
  RiEmotionSadLine,
} from "react-icons/ri";
const { TextArea } = Input;

type weather = {
  weather: string;
};

type emotion = {
  emotion: string;
};

export const SelectToday = styled.div`
  font-size: 40px;
  border: 1px solid #d9d9d9;
  padding: 4px 11px;

  & > svg {
    margin-right: 15px;
  }
`;

export const SubmitButton = styled(Button)`
  width: 100%;
`;

export const SelectedDatePicker = styled(DatePicker)`
  width: 100%;
  font-size: 30px;
`;

export const Title = styled(Input)`
  width: 100%;
  font-size: 21.5px;
  font-weight: bold;
`;

export const Content = styled(TextArea)`
  font-size: 18px;
`;

export const FlexBox= styled.div`
  display : flex;
`;

export const PriviewImage = styled.img`
  width : 200px;
  height : 400px;
`

export const ImageBox = styled.div`
  overflow-x : auto;
  height : 200px;
`;

export const Rain = styled(BiCloudRain)<weather>`
  color: #4169e1;
  border: ${(props) =>
    props.weather === "rain" ? "1px solid black" : "none"};
  border-radius: ${(props) => (props.weather === "rain" ? "50%" : "none")};
`;

export const Sun = styled(BiSun)<weather>`
  color: #ff0000;
  border: ${(props) =>
    props.weather === "sun" ? "1px solid black" : "none"};
  border-radius: ${(props) => (props.weather === "sun" ? "50%" : "none")};
`;

export const Lightning = styled(BiCloudLightning)<weather>`
  color: #aeb404;
  border: ${(props) =>
    props.weather === "lightning" ? "1px solid black" : "none"};
  border-radius: ${(props) => (props.weather === "lightning" ? "50%" : "none")};
`;

export const Snow = styled(BiCloudSnow)<weather>`
  color: skyblue;
  border: ${(props) =>
    props.weather === "snow" ? "1px solid black" : "none"};
  border-radius: ${(props) => (props.weather === "snow" ? "50%" : "none")};
`;

export const Cloud = styled(BiCloud)<weather>`
  color: #677486;
  border: ${(props) =>
    props.weather === "cloud" ? "1px solid black" : "none"};
  border-radius: ${(props) => (props.weather === "cloud" ? "50%" : "none")};
`;

export const Happy = styled(RiEmotionHappyLine)<emotion>`
  color: #87ea07;
  border: ${(props) =>
    props.emotion === "happy" ? "1px solid black" : "none"};
  border-radius: ${(props) => (props.emotion === "happy" ? "50%" : "none")};
`;

export const Normal = styled(RiEmotionNormalLine)<emotion>`
  border: ${(props) =>
    props.emotion === "normal" ? "1px solid black" : "none"};
  border-radius: ${(props) => (props.emotion === "normal" ? "50%" : "none")};
`;

export const Unhappy = styled(RiEmotionUnhappyLine)<emotion>`
  color: #7d7891;
  border: ${(props) =>
    props.emotion === "unhappy" ? "1px solid black" : "none"};
  border-radius: ${(props) => (props.emotion === "unhappy" ? "50%" : "none")};
`;

export const Sad = styled(RiEmotionSadLine)<emotion>`
  color: #1872f9;
  border: ${(props) =>
    props.emotion === "sad" ? "1px solid black" : "none"};
  border-radius: ${(props) => (props.emotion === "sad" ? "50%" : "none")};
`;
