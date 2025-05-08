import React from "react";

import { PngContainer } from "./image_components.styles";

import { PNGIcon } from "./image_components.styles";
import customByUserIcon from "../../../assets/icons/pngs/custom_byUser_icon.png";

export const PNGComponent = ({
  position,
  left,
  top,
  justify,
  action,
  icon_width,
  icon_height,
}) => {
  return (
    <PngContainer
      position={position}
      left={left}
      top={top}
      justify={justify}
      onPress={action}
    >
      <PNGIcon
        source={customByUserIcon}
        icon_width={icon_width}
        icon_height={icon_height}
      />
    </PngContainer>
  );
};
