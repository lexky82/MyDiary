import React from "react";
import { Uploader } from "./styles";

type props = {
  imgUploaderChangeHandler: Function;
};

const ImageUploaderComponent = ({ imgUploaderChangeHandler }: props) => {

  return (
    <Uploader
      buttonText="이미지 선택"
      label="이미지 최대 크기 : 5MB, 형식 : JPG | PNG | GIF"
      withIcon={true}
      onChange={(e) => imgUploaderChangeHandler(e)}
    />
  );
};

export default ImageUploaderComponent;
