import styled from "@emotion/styled";
import { Button, DatePicker, Input } from "antd";

const { TextArea } = Input;

export const SelectToday = styled.div`
  font-size: 2.5rem;
  border: 1px solid #d9d9d9;
  padding: 0.25rem 0.688rem;

  & > svg {
    margin-right: 0.938rem;
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
  font-size: 1.344rem;
  font-weight: bold;
`;

export const Content = styled(TextArea)`
  font-size: 1.125rem;
`;

export const FlexBox = styled.div`
  display: flex;
`;

export const PriviewImage = styled.img`
  width: 12.5rem;
  height: 25rem;
`;

export const ImageBox = styled.div`
  overflow-x: auto;
  height: 12.5rem;
`;
