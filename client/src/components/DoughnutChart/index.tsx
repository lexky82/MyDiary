import { ResponsivePie } from "@nivo/pie";

type props = {
  data : Array<Object>
}

const MyResponsivePie = ({ data }: props) => (
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    fill={[
      {
        match: {
          id: "sun",
        },
        id: "lines",
      },
      {
        match: {
          id: "cloud",
        },
        id: "lines",
      },
      {
        match: {
          id: "rain",
        },
        id: "lines",
      },
      {
        match: {
          id: "snow",
        },
        id: "lines",
      },
      {
        match: {
          id: "lightning",
        },
        id: "lines",
      },
    ]}
  />
);
export default MyResponsivePie;
