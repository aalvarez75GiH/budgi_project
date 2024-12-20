import React from "react";

import { Text } from "../../../infrastructure/typography/text.component";
import { HeaderLabelContainer } from "./headers.styles";
import { RNPIconButton } from "../../buttons/RNP_icon_button";
import { FlexibleContainer } from "../../containers/flexible_container";
import { LinkButton } from "../../buttons/link_button";
import { ClickableControlledContainer } from "../../containers/clickable_controlled_container";
import { theme } from "../../../infrastructure/theme";

export const BackHeaderWithLabelAndCancelButton = ({
  caption,
  direction,
  color,
  flexibility,
  arrow_left_action,
  cancel_button_action,
  align,
}) => {
  return (
    <FlexibleContainer
      color={color}
      direction={direction}
      flexibility={flexibility}
      justify={"center"}
      //   color="red"
    >
      <RNPIconButton
        action={arrow_left_action}
        icon="arrow-left"
        width={"20%"}
        align={align}
      />
      <HeaderLabelContainer width={"50%"} marginLeft={"5%"}>
        <Text text_variant="bold_text_20">{caption}</Text>
      </HeaderLabelContainer>
      <ClickableControlledContainer
        width={"22%"}
        height={"55px"}
        justify="center"
        alignment="center"
        action={() => null}
        color={theme.colors.bg.p_FFFFFF}
        // color={"#FAD"}
        onPress={() => null}
      >
        <LinkButton caption="Cancel" action={cancel_button_action} />
      </ClickableControlledContainer>
    </FlexibleContainer>
  );
};
