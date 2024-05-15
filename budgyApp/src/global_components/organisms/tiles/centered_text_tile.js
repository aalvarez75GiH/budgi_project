import React, { useState, useContext } from "react";

import { SVGComponent } from "../../image_components/svg.component";
import { PNGComponent } from "../../image_components/png.component";

import { Text } from "../../../infrastructure/typography/text.component";
import { theme } from "../../../infrastructure/theme";
import { RNPIconButton } from "../../buttons/RNP_icon_button";
import {
  TilesContainer,
  TileLabelContainer,
  TileIconContainer,
} from "../../containers/tile_container";

export const CenteredTextTile = ({
  caption,
  navigation,
  icon_name,
  active_icon,
  action,
}) => {
  return (
    <TilesContainer
      onPress={action}
      width={"100%"}
      height={70}
      borderColor={theme.colors.bg.e_F4F4F4}
      justify={"center"}
      align={"center"}
      bg_color={theme.colors.bg.p_FFFFFF}
      //   bg_color={"red"}
    >
      {active_icon ? (
        <TileIconContainer
          width={"10%"}
          height={"100%"}
          bg_color={theme.colors.bg.p_FFFFFF}
          justify={"center"}
          align={"center"}
        >
          <SVGComponent
            icon_width={30}
            icon_height={30}
            position={"static"}
            left={0}
            top={0}
            justify={"center"}
            icon_name={icon_name}
          />
        </TileIconContainer>
      ) : null}

      <TileLabelContainer
        width={"50%"}
        height={90}
        justify="center"
        // bg_color="lightblue"
        align="center"
      >
        <Text text_variant="bold_text_16">{caption}</Text>
      </TileLabelContainer>
    </TilesContainer>
  );
};
