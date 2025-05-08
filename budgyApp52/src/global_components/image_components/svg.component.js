import React from "react";

import { SvgContainer } from "./image_components.styles";
// import { useSVGComponent } from "../../util/default_icons.hook";
import { useSVGComponent } from "../../util/system_icons.hook";
export const SVGComponent = ({
  icon_width,
  icon_height,
  position,
  left,
  top,
  justify,
  action,
  icon_name,
  icon_color,
}) => {
  const { SVGIconComponent } = useSVGComponent(icon_name);

  return (
    <SvgContainer
      position={position}
      left={left}
      top={top}
      justify={justify}
      onPress={action}
    >
      <SVGIconComponent
        width={icon_width}
        height={icon_height}
        // fill={"#FFFFFF"}
        fill={icon_color}
        // fill={"#000000"}
      />
    </SvgContainer>
  );
};
