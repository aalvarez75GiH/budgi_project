import React from "react";

import { PNGComponent } from "../../image_components/png.component";
import { Text } from "../../../infrastructure/typography/text.component";
import { theme } from "../../../infrastructure/theme";
import {
  TilesContainer,
  TileLabelContainer,
  TileIconContainer,
  TileAmountMoneyContainer,
} from "../../containers/tile_container";
import { ControlledContainer } from "../../containers/controlled_container";
import { RNPIconButton } from "../../buttons/RNP_icon_button";
import { Spacer } from "../../../global_components/optimized.spacer.component";

export const IncomeWeekTile = ({ earned_amount, week_name, action }) => {
  console.log("EARNED AMOUNT AT TILE:", earned_amount);
  console.log("WEEK NAME AT TILE:", week_name);

  return (
    <TilesContainer
      onPress={action}
      width={"100%"}
      height={90}
      margin_top={2}
      borderColor={theme.colors.bg.e_F4F4F4}
      justify={"center"}
      align={"center"}
      bg_color={
        earned_amount === 0 ? theme.colors.bg.p_FFFFFF : theme.colors.ui.success
      }
      borderTopWidth={1.5}
      borderBottomWidth={0.5}
    >
      <ControlledContainer
        width={"40%"}
        height={"100%"}
        direction={"row"}
        // color="lightblue"
        justify={"center"}
        alignment={"center"}
      >
        <TileLabelContainer width={"70%"} height={90} justify="center">
          <Text
            text_variant={
              earned_amount === 0 ? "bold_text_16" : "white_bold_text_16"
            }
          >
            {week_name}
          </Text>
        </TileLabelContainer>
      </ControlledContainer>

      <ControlledContainer
        width={"50%"}
        height={"100%"}
        direction={"row"}
        // color="red"
        justify={"flex-end"}
        alignment={"center"}
      >
        <TileLabelContainer width={"40%"} height={90} justify="center">
          <Text
            text_variant={
              earned_amount === 0 ? "bold_text_16" : "white_bold_text_16"
            }
          >
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(earned_amount)}
          </Text>
        </TileLabelContainer>
      </ControlledContainer>

      <ControlledContainer
        width={"10%"}
        height={"100%"}
        direction={"row"}
        // color="brown"
        justify={"center"}
        alignment={"center"}
      >
        <TileIconContainer
          width={"100%"}
          height={"100%"}
          justify={"center"}
          align={"center"}
        >
          <RNPIconButton
            action={() => null}
            icon="chevron-right"
            width={50}
            color={
              earned_amount === 0
                ? theme.colors.ui.p_142223C
                : theme.colors.bg.p_FFFFFF
            }
          />
        </TileIconContainer>
      </ControlledContainer>
    </TilesContainer>
  );
};
