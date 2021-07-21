import React from "react";
import { Container, SvgIconTypeMap } from "@material-ui/core";
import { Count, Graphic, PaddingDiv, Explanation } from "./styles";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

type props = {
  explanation: string;
  count: number | undefined;
  Icon: OverridableComponent<SvgIconTypeMap>;
};

const CleanData = ({ explanation, count, Icon }: props) => {
  return (
    <Container style={{ paddingBottom: '1.0rem'}} maxWidth="sm">
      <Graphic>
        <PaddingDiv>
          <Icon
            style={{
              fontSize: "50px",
            }}
          />
          <Count>{count}</Count>
          <Explanation>{explanation}</Explanation>
        </PaddingDiv>
      </Graphic>
    </Container>
  );
};

export default CleanData;
