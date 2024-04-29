import React, { useState, useContext } from "react";

import { SVGComponent } from "../../image_components/svg.component";
import { PNGComponent } from "../../image_components/png.component";

import { Text } from "../../../infrastructure/typography/text.component";
import { theme } from "../../../infrastructure/theme";
import { RNPIconButton } from "../../buttons/RNP_icon_button";
import {
  TileLabelContainer,
  InfoDetailsTileIconContainer,
  InfoDetailsTileContainer,
} from "../../containers/tile_container";
import { ControlledContainer } from "../../containers/controlled_container";
import { Spacer } from "../../optimized.spacer.component";

export const InfoDetailsTile = ({
  caption,
  caption2,
  navigation,
  icon_name,
  action,
  icon_width,
  icon_height,
}) => {
  return (
    <InfoDetailsTileContainer
      width={"100%"}
      height={"70px"}
      borderColor={theme.colors.bg.e_F4F4F4}
      borderWidth={2}
      justify={"flex-start"}
      align={"center"}
      bg_color={theme.colors.bg.p_FFFFFF}
    >
      <Spacer position="left" size="large" />
      <Spacer position="left" size="large" />

      <TileLabelContainer
        width={"55%"}
        height={"60%"}
        // bg_color="red"
        direction="row"
      >
        <ControlledContainer
          width={"40%"}
          height={"100%"}
          direction={"row"}
          // color="#B9B9B9"
          justify={"flex-start"}
          alignment={"center"}
        >
          <Text text_variant="bold_text_16">{caption}</Text>
        </ControlledContainer>
        <Spacer position="left" size="large" />
        <ControlledContainer
          width={"70%"}
          height={"100%"}
          direction={"row"}
          // color="lightblue"
          justify={"flex-start"}
          alignment={"center"}
        >
          <Text text_variant="regular_text_16">{caption2}</Text>
        </ControlledContainer>
      </TileLabelContainer>
      <Spacer position="left" size="extraLarge" />
      {/* <Spacer position="left" size="extraLarge" /> */}
      <InfoDetailsTileIconContainer
        width={"20%"}
        height={"100%"}
        bg_color={theme.colors.bg.p_FFFFFF}
        justify={"flex-end"}
        align={"flex-end"}
        onPress={action}
      >
        <SVGComponent
          icon_width={icon_width}
          icon_height={icon_height}
          position={"static"}
          left={0}
          top={0}
          justify={"center"}
          icon_name={icon_name}
        />
      </InfoDetailsTileIconContainer>
    </InfoDetailsTileContainer>
  );
};
