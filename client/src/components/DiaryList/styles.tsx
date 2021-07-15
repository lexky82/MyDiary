import styled from "@emotion/styled";
import { Carousel, Image } from "antd";

export const Thumbnail = styled.img`
  width : 150px;
  height : 150px;
  
  @media screen and (max-width: 768px) {
    height : 110px;
    width : 110px;
  }
`;