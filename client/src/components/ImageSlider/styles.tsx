import styled from "@emotion/styled";
import { Carousel, Image } from "antd";

export const Slider = styled(Carousel)`
  > .slick-dots li button {
    width: 6px;
    height: 6px;
    border-radius: 100%;
  }
  > .slick-dots li.slick-active button {
    width: 7px;
    height: 7px;
    border-radius: 100%;
    background: red;
  }
  height : 50vh;
  background-color : black;

  @media screen and (max-width: 768px) {
    height : 40vh;
  }
`;

export const SliserImage = styled(Image)`
  height : 50vh;
  
  @media screen and (max-width: 768px) {
    height : 40vh;
  }
`;
