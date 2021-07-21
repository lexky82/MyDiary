import styled from "@emotion/styled";
import { Carousel, Image } from "antd";

export const Slider = styled(Carousel)`
  > .slick-dots li button {
    width: 0.375rem;
    height: 0.375rem;
    border-radius: 100%;
  }
  > .slick-dots li.slick-active button {
    width: 0.438rem;
    height: 0.438rem;
    border-radius: 100%;
    background: skyblue;
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
