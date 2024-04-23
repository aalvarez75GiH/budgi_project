import React from "react";

import { Text } from "../../../infrastructure/typography/text.component";
import { HeaderLabelContainer } from "./headers.styles";
import { RNPIconButton } from "../../buttons/RNP_icon_button";
import { FlexibleContainer } from "../../containers/flexible_container";
import { LinkButton } from "../../buttons/link_button";
import { ClickableControlledContainer } from "../../containers/clickable_controlled_container";
import { theme } from "../../../infrastructure/theme";

export const BackHeaderWithLabelComponentButton = ({
  navigation,
  caption,
  direction,
  color,
  flexibility,
  arrow_left_action,
  done_button_action,
  isDoneActive,
  description,
}) => {
  return (
    <FlexibleContainer
      color={color}
      direction={direction}
      flexibility={flexibility}
      justify={"center"}
    >
      <RNPIconButton
        action={arrow_left_action}
        icon="arrow-left"
        width={"20%"}
      />
      <HeaderLabelContainer width={"50%"} marginLeft={"5%"}>
        <Text text_variant="headers_label">{caption}</Text>
      </HeaderLabelContainer>
      <ClickableControlledContainer
        width={"20%"}
        height={"55px"}
        justify="center"
        alignment="center"
        action={() => null}
        color={theme.colors.bg.p_FFFFFF}
        // color={"#FAD"}
        onPress={() => null}
      >
        {isDoneActive ? (
          <LinkButton caption="Done" action={done_button_action} />
        ) : null}
      </ClickableControlledContainer>
    </FlexibleContainer>
  );
};
