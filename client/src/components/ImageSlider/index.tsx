import React from "react";
import { Slider, SliserImage } from "./styles";

type props = {
  images: Array<string>;
};

const ImageSlider = ({ images }: props) => {
  return (
    <Slider autoplay>
      {images.map((image, index) => (
          <SliserImage
            src={image}
            key={index}
          />
      ))}
    </Slider>
  );
};

export default ImageSlider;
