import React, { useState } from "react";
import ImageUploader from "react-images-upload";

type props = {
  imgUploaderChangeHandler: Function;
};

const ImageUploaderComponent = ({ imgUploaderChangeHandler }: props) => {
  const [base64Image, setBase64Image] = useState<Array<{ key: number; value: object }>>();

  const readerBase64 = (image: any) => {};

  return (
    <ImageUploader
      style={{ width: "30%", margin:'0' }}
      withIcon={true}
      onChange={(e) => imgUploaderChangeHandler(e)}
    />
  );
};

export default ImageUploaderComponent;
