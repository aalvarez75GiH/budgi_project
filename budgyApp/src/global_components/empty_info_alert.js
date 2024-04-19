import React from "react";

import { ControlledContainer } from "./containers/controlled_container";
import { Text } from "../infrastructure/typography/text.component";

export const EmptyInfoAlert = ({
  caption,
  width,
  height,
  direction,
  justify,
  alignment,
  color,
}) => {
  return (
    <ControlledContainer
      width={width}
      height={height}
      direction={direction}
      justify={justify}
      alignment={alignment}
      color={color}
    >
      <Text text_variant="disable_caption_16">{caption}</Text>
    </ControlledContainer>
  );
};

// width: 500,
//     height: 200,
//     backgroundColor: "#F9F9FA",
//     justifyContent: "center",
//     alignItems: "center",
