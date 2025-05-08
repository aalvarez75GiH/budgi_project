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

export const TotalAmountTile = ({ caption, real_income_total_amount }) => {
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
      borderTopWidth={2}
      borderBottomWidth={2}
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
      ></ControlledContainer>
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
          <Text text_variant="bold_text_20">{caption}</Text>
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
        {/* <Text text_variant="neutral_bold_text_14">Collected</Text> */}
        <Text text_variant="bold_text_16">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(real_income_total_amount)}
        </Text>
      </ControlledContainer>
      <ControlledContainer
        width={"15%"}
        height={"100%"}
        direction={"row"}
        // color="brown"
        justify={"center"}
        alignment={"center"}
      ></ControlledContainer>
    </TilesContainer>
  );
};
