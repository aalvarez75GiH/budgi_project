import React, { useState, useContext } from "react";

import { SVGComponent } from "../../image_components/svg.component";
import { PNGComponent } from "../../image_components/png.component";

import { Text } from "../../../infrastructure/typography/text.component";
import { CheckIconComponent } from "../../check_icon_component";
import { TransactionsContext } from "../../../infrastructure/services/transactions/transactions.context";
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
    >
      {icon_name === `byUserCategoryIcon` ? (
        <PNGComponent
          icon_width={50}
          icon_height={50}
          position={"static"}
          left={"0%"}
          top={"0%"}
          justify={"center"}
          icon_name={icon_name}
        />
      ) : (
        <SVGComponent
          icon_width={30}
          icon_height={30}
          position={"static"}
          left={"0%"}
          top={"0%"}
          justify={"center"}
          icon_name={icon_name}
          icon_color={theme.colors.buttons.s_142223C}
        />
      )}

      <TileLabelContainer width={"70%"} height={"90px"}>
        <Text text_variant="Category_Tile_Caption">{category_name}</Text>
      </TileLabelContainer>
      <TileIconContainer>
        {isSelected && <CheckIconComponent icon_width={20} icon_height={20} />}
      </TileIconContainer>
    </TilesContainer>
  );
};
