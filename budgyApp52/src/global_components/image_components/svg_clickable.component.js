import React from "react";

import { SvgClickableContainer } from "../containers/svg_clickable_container";
// import { useSVGComponent } from "../../util/default_icons.hook";
import { useSVGComponent } from "../../util/system_icons.hook";

export const SVG_Clickable_Component = ({
  icon_width,
  icon_height,
  position,
  icon_left,
  icon_top,
  justify,
  action,
  icon_name,
  icon_color,
}) => {
  const { SVGIconComponent } = useSVGComponent(icon_name);

  return (
    <SvgClickableContainer
      position={position}
      left={icon_left}
      top={icon_top}
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
    </SvgClickableContainer>
  );
};
