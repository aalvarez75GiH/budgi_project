import React from "react";

import { SVGComponent } from "../../image_components/svg.component";
import { PNGComponent } from "../../image_components/png.component";

import { Text } from "../../../infrastructure/typography/text.component";
import { CheckIconComponent } from "../../check_icon_component";
import {
  TilesContainer,
  TileLabelContainer,
  TileIconContainer,
} from "../../containers/tile_container";
import { theme } from "../../../infrastructure/theme";

export const RegularCategoryTile = ({
  category_name,
  icon_name,
  isSelected,
  action,
}) => {
  return (
    <TilesContainer
      onPress={action}
      width={"100%"}
      height={"90px"}
      margin_top={"2px"}
      borderColor={theme.colors.bg.e_F4F4F4}
      borderWidth={"2px"}
      justify={"center"}
      align={"center"}
      bg_color={theme.colors.bg.p_FFFFFF}
    >
      {icon_name === `byUserCategoryIcon` ? (
        <PNGComponent
          icon_width={"50px"}
          icon_height={"50px"}
          position={"static"}
          justify={"center"}
          icon_name={icon_name}
        />
      ) : (
        <SVGComponent
          icon_width={"30px"}
          icon_height={"30px"}
          position={"static"}
          justify={"center"}
          icon_name={icon_name}
          icon_color={theme.colors.buttons.s_142223C}
        />
      )}

      <TileLabelContainer width={"70%"} height={"90px"} justify="center">
        <Text text_variant="bold_text_16">{category_name}</Text>
      </TileLabelContainer>
      <TileIconContainer
        width={"10%"}
        height={"100%"}
        bg_color={theme.colors.bg.p_FFFFFF}
        justify={"center"}
        align={"center"}
      >
        {isSelected && (
          <CheckIconComponent icon_width={"25px"} icon_height={"25px"} />
        )}
      </TileIconContainer>
    </TilesContainer>
  );
};
