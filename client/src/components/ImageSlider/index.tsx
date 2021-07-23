import React from "react";
import { Slider, SliserImage } from "./styles";

type props = {
  images: Array<{path:string}>;
};

const ImageSlider = ({ images }: props) => {
  return (
    <Slider autoplay>
      {images.map((image, index) => (
          <SliserImage
            src={image.path}
            key={index}
          />
      ))}
    </Slider>
  );
};

export default ImageSlider;
