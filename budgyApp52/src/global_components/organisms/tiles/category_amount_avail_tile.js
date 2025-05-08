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
import { ControlledContainer } from "../../containers/controlled_container";
import { ClickableControlledContainer } from "../../containers/clickable_controlled_container";

// import { SVGIconComponent } from "../../image_components/svg_icon.component";
import { useSVGComponent } from "../../../util/system_icons.hook";
export const CategoryAmountAvailTile = ({
  category_name,
  icon_name,
  amount_avail,
  item,
  isSelected,
  action,
}) => {
  const { SVGIconComponent } = useSVGComponent(icon_name);

  return (
    <ClickableControlledContainer
      width={125}
      height={160}
      justify="center"
      alignment="center"
      direction="column"
      color={theme.colors.neutrals.e2_F5F5F5}
      borderTopLeftRadius={20}
      borderBottomLeftRadius={20}
      borderTopRightRadius={20}
      borderBottomRightRadius={20}
      onPress={action}
    >
      <SVGIconComponent
        width={30}
        height={30}
        // fill={"#FFFFFF"}
        fill={theme.colors.buttons.s_142223C}
        // fill={"#000000"}
      />

      {/* <Text text_variant="bold_text_16">{""}</Text> */}
      <Text text_variant="bold_text_14">{category_name}</Text>
      <Text text_variant="bold_text_16">{""}</Text>
      <Text text_variant="bold_text_14">Avail:</Text>
      <Text text_variant="green_bold_text_16">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount_avail)}
      </Text>
    </ClickableControlledContainer>
  );
};
