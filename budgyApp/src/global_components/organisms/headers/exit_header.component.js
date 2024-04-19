import React from "react";

import { FlexibleContainer } from "../../containers/flexible_container";
import { SVGComponent } from "../../image_components/svg.component";
import { SVG_Clickable_Component } from "../../image_components/svg_clickable.component";

export const ExitHeaderComponent = ({
  navigation,
  color,
  flexibility,
  direction,
}) => {
  const closingMenu = () => {
    navigation.goBack();
  };

  return (
    <FlexibleContainer
      color={color}
      direction={direction}
      flexibility={flexibility}
      justify={"center"}
    >
      <SVG_Clickable_Component
        action={closingMenu}
        icon_name="ExitIcon"
        // icon_path={`${svg_path}/exit_icon2.svg`}
        icon_width={20}
        icon_height={20}
        position={"absolute"}
        left={"80%"}
        top={"60%"}
        justify="flex-end"
      />
    </FlexibleContainer>
  );
};
