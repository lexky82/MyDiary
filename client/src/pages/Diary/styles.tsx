import styled from "@emotion/styled";
import { Button, DatePicker, Input } from "antd";
import {
  BiCloudLightning,
  BiCloudRain,
  BiCloudSnow,
  BiSun,
} from "react-icons/bi";
const { TextArea } = Input;

export const SelectWheater = styled.div`
  font-size: 40px;
  border: 1px solid black;

  & > svg {
    margin-right: 15px;
  }
`;

export const SubmitButton = styled(Button)`
  margin-top: 1.25rem;
  float: right;
`;

export const SelectedDatePicker = styled(DatePicker)`
  width: 100%;
  font-size: 30px;
`;

export const Title = styled(Input)`
  width: 100%;
  font-size: 22px;
  font-weight: bold;
`;

export const Content = styled(TextArea)`
  font-size: 18px;
`;

export const Rain = styled(BiCloudRain)`
  color: #4169E1;
`;

export const Sun = styled(BiSun)`
  color: #FF0000;
`;

export const Lightning = styled(BiCloudLightning)`
  color: #AEB404;
`;

export const Snow = styled(BiCloudSnow)`
  color: skyblue;
`;
