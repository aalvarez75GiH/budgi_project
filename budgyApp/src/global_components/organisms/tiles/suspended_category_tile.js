import React from "react";

import { SVGComponent } from "../../image_components/svg.component";
import { PNGComponent } from "../../image_components/png.component";

import { Text } from "../../../infrastructure/typography/text.component";
import {
  TilesContainer,
  TileLabelContainer,
  TileIconContainer,
} from "../../containers/tile_container";
import { theme } from "../../../infrastructure/theme";
import { RegularCTAButton } from "../../buttons/cta_btn";

export const SuspendedCategoryTile = ({ category_name, icon_name, action }) => {
  return (
    <TilesContainer
      onPress={() => null}
      width={"100%"}
      height={90}
      margin_top={2}
      borderColor={theme.colors.bg.e_F4F4F4}
      justify={"center"}
      align={"center"}
      bg_color={theme.colors.bg.p_FFFFFF}
      borderTopWidth={1}
      borderBottomWidth={0.5}
    >
      {icon_name === `byUserCategoryIcon` ? (
        <PNGComponent
          icon_width={50}
          icon_height={50}
          position={"static"}
          justify={"center"}
          icon_name={icon_name}
        />
      ) : (
        <SVGComponent
          icon_width={30}
          icon_height={30}
          position={"static"}
          justify={"center"}
          icon_name={icon_name}
          icon_color={theme.colors.buttons.s_142223C}
        />
      )}

      <TileLabelContainer width={"50%"} height={90} justify="center">
        <Text text_variant="bold_text_16">{category_name}</Text>
      </TileLabelContainer>
      <TileIconContainer
        width={"30%"}
        height={"100%"}
        bg_color={theme.colors.bg.p_FFFFFF}
        // bg_color={"lightblue"}
        justify={"center"}
        align={"center"}
      >
        <RegularCTAButton
          caption="Activate"
          width={110}
          height={50}
          color={theme.colors.buttons.s_142223C}
          borderRadius={50}
          action={action}
          text_variant="white_bold_text_14"
        />
      </TileIconContainer>
    </TilesContainer>
  );
};
