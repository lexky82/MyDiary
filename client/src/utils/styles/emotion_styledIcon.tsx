import styled from "@emotion/styled";

import {
  RiEmotionHappyLine,
  RiEmotionNormalLine,
  RiEmotionUnhappyLine,
  RiEmotionSadLine,
} from "react-icons/ri";

type emotion = {
  emotion: string;
};

export const Happy = styled(RiEmotionHappyLine)<emotion>`
  color: #87ea07;
  border: ${(props) =>
    props.emotion === "happy" ? "1px solid black" : "none"};
  border-radius: ${(props) => (props.emotion === "happy" ? "50%" : "none")};
`;

export const Normal = styled(RiEmotionNormalLine)<emotion>`
  border: ${(props) =>
    props.emotion === "normal" ? "1px solid black" : "none"};
  border-radius: ${(props) => (props.emotion === "normal" ? "50%" : "none")};
`;

export const Unhappy = styled(RiEmotionUnhappyLine)<emotion>`
  color: #7d7891;
  border: ${(props) =>
    props.emotion === "unhappy" ? "1px solid black" : "none"};
  border-radius: ${(props) => (props.emotion === "unhappy" ? "50%" : "none")};
`;

export const Sad = styled(RiEmotionSadLine)<emotion>`
  color: #1872f9;
  border: ${(props) => (props.emotion === "sad" ? "1px solid black" : "none")};
  border-radius: ${(props) => (props.emotion === "sad" ? "50%" : "none")};
`;
