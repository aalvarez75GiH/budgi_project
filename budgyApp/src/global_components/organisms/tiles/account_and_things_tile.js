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

export const AccountAndThingsTile = ({
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
      height={"70px"}
      borderColor={theme.colors.bg.e_F4F4F4}
      borderWidth={"2px"}
    >
      {icon_name === `byUserCategoryIcon` ? (
        <PNGComponent
          icon_width={50}
          icon_height={50}
          position={"static"}
          left={0}
          top={0}
          justify={"center"}
          icon_name={icon_name}
        />
      ) : (
        <SVGComponent
          icon_width={30}
          icon_height={30}
          position={"static"}
          left={0}
          top={0}
          justify={"center"}
          icon_name={icon_name}
        />
      )}

      <TileLabelContainer width={"70%"} height={"90px"}>
        <Text text_variant="Category_Tile_Caption">{caption}</Text>
      </TileLabelContainer>
      <TileIconContainer>
        {active_icon && (
          <RNPIconButton
            action={() => null}
            icon="chevron-right"
            width={0}
            color={theme.colors.brand.primary}
          />
        )}
      </TileIconContainer>
    </TilesContainer>
  );
};
