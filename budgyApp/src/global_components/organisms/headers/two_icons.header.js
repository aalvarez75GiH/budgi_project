import React from "react";

import { FlexibleContainer } from "../../containers/flexible_container";
import { SVGComponent } from "../../image_components/svg.component";
import { SVG_Clickable_Component } from "../../image_components/svg_clickable.component";

export const TwoIconsHeaderComponent = ({
  navigation,
  color,
  flexibility,
  direction,
  action_icon_1,
  action_icon_2,
}) => {
  return (
    <FlexibleContainer
      color={color}
      direction={direction}
      flexibility={flexibility}
      justify={"center"}
      alignment={"center"}
    >
      <SVG_Clickable_Component
        action={action_icon_1}
        icon_name="RemoveIcon"
        // icon_path={`${svg_path}/exit_icon2.svg`}
        icon_width={22}
        icon_height={22}
        position={"absolute"}
        left={"2%"}
        top={"60%"}
        justify="flex-end"
      />
      <SVG_Clickable_Component
        action={action_icon_2}
        icon_name="ExitIcon"
        // icon_path={`${svg_path}/exit_icon2.svg`}
        icon_width={18}
        icon_height={18}
        position={"absolute"}
        left={"80%"}
        top={"60%"}
        justify="flex-end"
      />
    </FlexibleContainer>
  );
};
