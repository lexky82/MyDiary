import styled from "@emotion/styled";
import { Carousel, Image } from "antd";

export const Slider = styled(Carousel)`
  width: 100%;
  height : 60vh;
  background-color : black;

  @media screen and (max-width: 768px) {
    height : 40vh;
  }
`;

export const SliserImage = styled(Image)`
  height : 60vh;
  
  @media screen and (max-width: 768px) {
    height : 40vh;
  }
`;
