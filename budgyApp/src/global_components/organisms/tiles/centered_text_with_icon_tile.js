import React from "react";

import { SVGComponent } from "../../image_components/svg.component";
import { Text } from "../../../infrastructure/typography/text.component";
import { theme } from "../../../infrastructure/theme";
import {
  TilesContainer,
  TileLabelContainer,
  TileIconContainer,
} from "../../containers/tile_container";
import { ControlledContainer } from "../../containers/controlled_container";

export const CenteredTextTileWithIcon = ({
  caption,
  icon_name,
  action,
  tile_selected,
}) => {
  console.log("CAPTION: ", caption);
  console.log("TILE SELECTED: ", tile_selected);
  console.log("ICON NAME: ", icon_name);

  return (
    <TilesContainer
      onPress={action}
      width={"100%"}
      height={70}
      borderColor={theme.colors.bg.e_F4F4F4}
      justify={"center"}
      align={"center"}
      bg_color={theme.colors.bg.p_FFFFFF}
      borderTopWidth={1}
      borderBottomWidth={1}
      //   bg_color={"red"}
    >
      <ControlledContainer
        width={"20%"}
        height={"50px"}
        justify="flex-start"
        alignment="center"
        direction="row"
        // color="lightblue"
      ></ControlledContainer>

      <TileLabelContainer
        width={"60%"}
        height={50}
        justify="center"
        // bg_color="red"
        align="center"
      >
        <Text text_variant="bold_text_16">{caption}</Text>
      </TileLabelContainer>
      <ControlledContainer
        width={"20%"}
        height={"50px"}
        justify="center"
        alignment="center"
        direction="row"
        // color="lightblue"
      >
        {tile_selected === caption ? (
          <TileIconContainer
            width={"10%"}
            height={"100%"}
            bg_color={theme.colors.bg.p_FFFFFF}
            //   bg_color={"lightblue"}
            justify={"center"}
            align={"center"}
          >
            <SVGComponent
              icon_width={25}
              icon_height={25}
              position={"static"}
              left={0}
              top={0}
              justify={"center"}
              icon_name={icon_name}
            />
          </TileIconContainer>
        ) : null}
      </ControlledContainer>
    </TilesContainer>
  );
};
