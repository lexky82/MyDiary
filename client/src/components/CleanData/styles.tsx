import styled from "@emotion/styled";
import { Typography } from "@material-ui/core";

export const Graphic = styled(Typography)`
  display: flex;
  justify-content: center;
  background-color: rgb(208, 242, 255);
  border-radius: 1rem;
  text-align: center;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const PaddingDiv = styled.div`
  padding: 10%;
`;

export const Count = styled.p`
  margin: 0;
  font-size: 3.125rem;
  font-weight: 700;
  padding-top: 1.375rem;

  @media screen and (max-width: 768px) {
    font-size: 1.875rem;
  }
`;

export const Explanation = styled.p`
  margin: 0;
  font-size: 1.375rem;
  font-weight: 500;
  opacity: 0.7;

  @media screen and (max-width: 768px) {
    font-size: 1.125rem;
  }
`;
