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
import { ControlledContainer } from "../../containers/controlled_container";
import { Spacer } from "../../../global_components/optimized.spacer.component";
import { RNPIconButton } from "../../buttons/RNP_icon_button";

export const WorkAppTile = ({
  app_name,
  icon_name,
  action,
  icon_color,
  collected_money,
}) => {
  return (
    <TilesContainer
      onPress={action}
      width={"100%"}
      height={90}
      margin_top={2}
      borderColor={theme.colors.bg.e_F4F4F4}
      justify={"center"}
      align={"center"}
      bg_color={theme.colors.bg.p_FFFFFF}
      borderTopWidth={1.5}
      borderBottomWidth={0.5}
    >
      <ControlledContainer
        width={"4%"}
        height={"100%"}
        direction={"row"}
        // color="lightblue"
        justify={"center"}
        alignment={"center"}
      ></ControlledContainer>
      <ControlledContainer
        width={"10%"}
        height={"100%"}
        direction={"row"}
        // color="lightblue"
        justify={"center"}
        alignment={"center"}
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
            icon_color={icon_color}
          />
        )}
      </ControlledContainer>
      <ControlledContainer
        width={"40%"}
        height={"100%"}
        direction={"row"}
        // color="red"
        justify={"flex-start"}
        alignment={"flex-start"}
      >
        <Spacer position="left" size="large" />
        <TileLabelContainer width={"70%"} height={90} justify="center">
          <Text text_variant="bold_text_20">{app_name}</Text>
        </TileLabelContainer>
      </ControlledContainer>
      <ControlledContainer
        width={"30%"}
        height={"100%"}
        direction={"column"}
        // color="black"
        justify={"center"}
        alignment={"center"}
      >
        <Text text_variant="neutral_bold_text_14">Collected</Text>
        <Text text_variant="neutral_bold_text_14">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(collected_money)}
        </Text>
      </ControlledContainer>
      <ControlledContainer
        width={"15%"}
        height={"100%"}
        direction={"row"}
        // color="brown"
        justify={"center"}
        alignment={"center"}
      >
        <TileIconContainer
          width={"100%"}
          height={"100%"}
          bg_color={theme.colors.bg.p_FFFFFF}
          // bg_color="red"
          justify={"center"}
          align={"center"}
        >
          <RNPIconButton
            action={() => null}
            icon="chevron-right"
            width={50}
            color={theme.colors.brand.primary}
            // color="red"
          />
        </TileIconContainer>
      </ControlledContainer>
    </TilesContainer>
  );
};
