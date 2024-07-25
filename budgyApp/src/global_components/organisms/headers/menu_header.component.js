import React from "react";

import { FlexibleContainer } from "../../containers/flexible_container";
import { SVG_Clickable_Component } from "../../image_components/svg_clickable.component";

export const MenuHeaderComponent = ({
  navigation,
  color,
  icon_left,
  icon_top,
}) => {
  const openingMenu = () => {
    navigation.navigate("Menu");
  };

  return (
    <FlexibleContainer
      color={color}
      direction="row"
      flexibility={0.5}
      // flexibility={1}
      justify={"center"}
    >
      <SVG_Clickable_Component
        action={openingMenu}
        icon_name="MenuIcon"
        icon_width={35}
        icon_height={35}
        position={"absolute"}
        icon_left={icon_left}
        icon_top={icon_top}
        justify="flex-end"
      />
    </FlexibleContainer>
  );
};
