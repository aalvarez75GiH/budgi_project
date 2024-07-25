import React from "react";

import { FlexibleContainer } from "../../containers/flexible_container";
import { SVGComponent } from "../../image_components/svg.component";
import { SVG_Clickable_Component } from "../../image_components/svg_clickable.component";

export const ExitHeaderComponent = ({
  navigation,
  color,
  flexibility,
  direction,
  justify,
  icon_top,
  icon_left,
}) => {
  const closingMenu = () => {
    navigation.goBack();
  };

  return (
    <FlexibleContainer
      color={color}
      direction={direction}
      flexibility={flexibility}
      justify={"flex-end"}
    >
      <SVG_Clickable_Component
        action={closingMenu}
        icon_name="ExitIcon"
        icon_width={20}
        icon_height={20}
        position={"absolute"}
        icon_left={icon_left}
        icon_top={icon_top}
        justify={justify}
      />
    </FlexibleContainer>
  );
};
