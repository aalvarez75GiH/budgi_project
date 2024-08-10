import React from "react";

import { FlexibleContainer } from "../../containers/flexible_container";
import { SVGComponent } from "../../image_components/svg.component";
import { SVG_Clickable_Component } from "../../image_components/svg_clickable.component";

export const TwoIconsHeaderComponent = ({
  navigation,
  color,
  flexibility,
  direction,
  action_icon_right,
  action_icon_left,
  icon_name_left,
  icon_name_right,
  icon_top_left,
  icon_left_left,
  icon_top_right,
  icon_left_right,
  category_status,
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
        action={action_icon_left}
        icon_name={icon_name_left}
        icon_width={22}
        icon_height={22}
        position={"absolute"}
        icon_left={icon_left_left}
        icon_top={icon_top_left}
        justify="flex-end"
      />
      {category_status === "active" && (
        <SVG_Clickable_Component
          action={action_icon_right}
          icon_name={icon_name_right}
          icon_width={23}
          icon_height={23}
          position={"absolute"}
          icon_left={icon_left_right}
          icon_top={icon_top_right}
          justify="flex-end"
        />
      )}
    </FlexibleContainer>
  );
};
