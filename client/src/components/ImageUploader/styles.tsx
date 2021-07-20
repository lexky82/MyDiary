import styled from "@emotion/styled";
import ImageUploader from "react-images-upload";

export const Uploader = styled(ImageUploader)`
  width: 30.5%;

  & > div {
    height: 200px;
    margin : 0;
  }

  @media screen and (max-width: 768px) {
    width : 100%;

  }
`;
