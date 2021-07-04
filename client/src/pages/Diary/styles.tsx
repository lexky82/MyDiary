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
} from "react-icons/ri"
const { TextArea } = Input;

export const SelectToday = styled.div`
  font-size: 40px;
  border: 1px solid #d9d9d9;
  padding: 4px 11px;

 & > svg{
   margin-right : 15px;
 }
`;

export const SubmitButton = styled(Button)`
  width : 100%;
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

export const Rain = styled(BiCloudRain)`
  color: #4169e1;
  border: ${weather => (weather === 'rain'  ? '1px solid black' : 'none')};
  border-radius: ${weather => (weather === 'rain'  ? '50%' : 'none')};
`;

export const Sun = styled(BiSun)`
  color: #ff0000;
  border: ${props => (props === 'sun'  ? '1px solid black' : 'none')};
  border-radius: ${weather => (weather === 'sun'  ? '50%' : 'none')};
`;

export const Lightning = styled(BiCloudLightning)`
  color: #aeb404;
  border: ${weather => (weather === 'lightning'  ? '1px solid black' : 'none')};
  border-radius: ${weather => (weather === 'lightning'  ? '50%' : 'none')};
`;

export const Snow = styled(BiCloudSnow)`
  color: skyblue;
  border: ${weather => (weather === 'snow'  ? '1px solid black' : 'none')};
  border-radius: ${weather => (weather === 'snow'  ? '50%' : 'none')};
`;

export const Cloud = styled(BiCloud)`
  color: #677486;
  border: ${weather => (weather === 'cloud'  ? '1px solid black' : 'none')};
  border-radius: ${weather => (weather === 'cloud'  ? '50%' : 'none')};
`;

export const Happy = styled(RiEmotionHappyLine)`
  color : #87EA07;
`;

export const Normal = styled(RiEmotionNormalLine)`
  
`;

export const Unhappy = styled(RiEmotionUnhappyLine)`
  color :#7D7891;
`;

export const Sad = styled(RiEmotionSadLine)`
  color : #1872F9;
`;