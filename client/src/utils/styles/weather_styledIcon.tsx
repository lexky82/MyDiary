import styled from "@emotion/styled";

import {
  BiCloud,
  BiCloudLightning,
  BiCloudRain,
  BiCloudSnow,
  BiSun,
} from "react-icons/bi";

type weather = {
  weather: string;
  size: string;
};

export const Rain = styled(BiCloudRain)<weather>`
  color: #4169e1;
  border: ${(props) => (props.weather === "rain" ? "1px solid black" : "none")};
  border-radius: ${(props) => (props.weather === "rain" ? "50%" : "none")};
  font-size: ${(props) => props.size};
`;

export const Sun = styled(BiSun)<weather>`
  color: #ff0000;
  border: ${(props) => (props.weather === "sun" ? "1px solid black" : "none")};
  border-radius: ${(props) => (props.weather === "sun" ? "50%" : "none")};
  font-size: ${(props) => props.size};
`;

export const Lightning = styled(BiCloudLightning)<weather>`
  color: #aeb404;
  border: ${(props) =>
    props.weather === "lightning" ? "1px solid black" : "none"};
  border-radius: ${(props) => (props.weather === "lightning" ? "50%" : "none")};
  font-size: ${(props) => props.size};
`;

export const Snow = styled(BiCloudSnow)<weather>`
  color: #87ceeb;
  border: ${(props) => (props.weather === "snow" ? "1px solid black" : "none")};
  border-radius: ${(props) => (props.weather === "snow" ? "50%" : "none")};
  font-size: ${(props) => props.size};
`;

export const Cloud = styled(BiCloud)<weather>`
  color: #677486;
  border: ${(props) =>
    props.weather === "cloud" ? "1px solid black" : "none"};
  border-radius: ${(props) => (props.weather === "cloud" ? "50%" : "none")};
  font-size: ${(props) => props.size};
`;
