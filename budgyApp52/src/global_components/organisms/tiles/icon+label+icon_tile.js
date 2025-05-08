import React from "react";

import { SVGComponent } from "../../image_components/svg.component";
import { Text } from "../../../infrastructure/typography/text.component";
import { theme } from "../../../infrastructure/theme";
import { RNPIconButton } from "../../buttons/RNP_icon_button";
import {
  TilesContainer,
  TileLabelContainer,
  TileIconContainer,
  IconLabelIconTileContainer,
} from "../../containers/tile_container";
import { ControlledContainer } from "../../containers/controlled_container";
import { Spacer } from "../../optimized.spacer.component";

export const Icon_Label_Icon_Tile = ({
  caption,
  navigation,
  icon_name,
  active_icon,
  action,
  width,
  svg_icon_size,
  border_top_width,
  border_bottom_width,
}) => {
  return (
    <IconLabelIconTileContainer
      onPress={action}
      width={width}
      height={100}
      borderColor={theme.colors.bg.e_F4F4F4}
      justify={"center"}
      align={"center"}
      bg_color={theme.colors.bg.p_FFFFFF}
      border_top_width={border_top_width}
      border_bottom_width={border_bottom_width}
      //   bg_color={"red"}
    >
      <ControlledContainer
        width={"15%"}
        height={"70%"}
        direction={"row"}
        // color="blue"
        color="white"
        justify={"center"}
        alignment={"center"}
      >
        <SVGComponent
          icon_width={svg_icon_size}
          icon_height={svg_icon_size}
          position={"static"}
          left={0}
          top={0}
          justify={"center"}
          icon_name={icon_name}
        />
      </ControlledContainer>

      <TileLabelContainer
        width={"60%"}
        height={60}
        justify="center"
        bg_color="white"
        // bg_color="lightblue"
      >
        {/* <Spacer position="left" size="small"> */}
        <Text text_variant="bold_text_20">{caption}</Text>
        {/* </Spacer> */}
      </TileLabelContainer>
      <TileIconContainer
        width={"20%"}
        height={"100%"}
        bg_color={theme.colors.bg.p_FFFFFF}
        // bg_color={"brown"}
        justify="center"
        align="center"
      >
        {active_icon && (
          <RNPIconButton
            action={() => null}
            icon="chevron-right"
            width={0}
            color={theme.colors.brand.primary}
          />
        )}
      </TileIconContainer>
    </IconLabelIconTileContainer>
  );
};
