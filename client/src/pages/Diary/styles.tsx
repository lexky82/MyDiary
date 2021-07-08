import styled from "@emotion/styled";
import { Button, DatePicker, Input } from "antd";

const { TextArea } = Input;

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

export const FlexBox = styled.div`
  display: flex;
`;

export const PriviewImage = styled.img`
  width: 200px;
  height: 400px;
`;

export const ImageBox = styled.div`
  overflow-x: auto;
  height: 200px;
`;
