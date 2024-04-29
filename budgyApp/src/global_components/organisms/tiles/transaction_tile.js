import React from "react";

import { SVGComponent } from "../../image_components/svg.component";
import { PNGComponent } from "../../image_components/png.component";
import { Text } from "../../../infrastructure/typography/text.component";
import { theme } from "../../../infrastructure/theme";
import {
  TilesContainer,
  TileLabelContainer,
  TileIconContainer,
  TileAmountMoneyContainer,
} from "../../containers/tile_container";
import { CheckIconComponent } from "../../check_icon_component";

export const TransactionTile = ({
  navigation,
  icon_name,
  action,
  amount,
  transaction_date,
  most_recent,
  short_name,
}) => {
  const movingToAnotherScreen = () => {
    navigation.navigate("");
  };

  return (
    <TilesContainer
      onPress={action}
      width={"100%"}
      height={80}
      borderColor={theme.colors.bg.e_F4F4F4}
      borderWidth={2}
      justify={"center"}
      align={"center"}
      bg_color={theme.colors.bg.p_FFFFFF}
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
          icon_color={theme.colors.buttons.s_142223C}
        />
      )}

      <TileLabelContainer width={"50%"} height={70} justify="center">
        <Text text_variant="bold_text_16">{short_name}</Text>
        <Text text_variant="neutral_bold_text_14">{transaction_date}</Text>
      </TileLabelContainer>
      <TileIconContainer
        width={"10%"}
        height={"100%"}
        bg_color={theme.colors.bg.p_FFFFFF}
        justify={"center"}
        align={"center"}
      >
        {most_recent && <CheckIconComponent icon_width={20} icon_height={20} />}
      </TileIconContainer>
      <TileAmountMoneyContainer>
        <Text text_variant="bold_text_16">${amount.toFixed(2)}</Text>
      </TileAmountMoneyContainer>
    </TilesContainer>
  );
};
