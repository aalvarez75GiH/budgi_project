import React from "react";

import { Text } from "../../../infrastructure/typography/text.component";
import { HeaderLabelContainer } from "./headers.styles";
import { RNPIconButton } from "../../buttons/RNP_icon_button";
import { FlexibleContainer } from "../../containers/flexible_container";
import { ControlledContainer } from "../../containers/controlled_container";

export const BackHeaderWithLabelComponent = ({
  navigation,
  caption,
  direction,
  color,
  flexibility,
  action,
  align,
  caption_margin_left,
}) => {
  return (
    <FlexibleContainer
      color={color}
      direction={direction}
      flexibility={flexibility}
      justify={"space-between"}
    >
      <ControlledContainer
        width={"20%"}
        height={"55px"}
        justify="center"
        alignment="center"
        // color={"red"}
      >
        <RNPIconButton
          action={action}
          icon="arrow-left"
          width={"20%"}
          align={align}
        />
      </ControlledContainer>
      <ControlledContainer
        width={"65%"}
        height={"55px"}
        justify="center"
        alignment="flex-start"
        // color={"blue"}
      >
        <Text text_variant="bold_text_20">{caption}</Text>
      </ControlledContainer>
      {/* <HeaderLabelContainer width={"75%"} marginLeft={caption_margin_left}>
        <Text text_variant="bold_text_20">{caption}</Text>
      </HeaderLabelContainer> */}
    </FlexibleContainer>
  );
};
