import React from "react";

import { Text } from "../../../infrastructure/typography/text.component";
import { HeaderLabelContainer } from "./headers.styles";
import { RNPIconButton } from "../../buttons/RNP_icon_button";
import { FlexibleContainer } from "../../containers/flexible_container";

export const BackHeaderWithLabelComponent = ({
  navigation,
  caption,
  direction,
  color,
  flexibility,
  action,
}) => {
  return (
    <FlexibleContainer
      color={color}
      direction={direction}
      flexibility={flexibility}
      justify={"center"}
    >
      <RNPIconButton action={action} icon="arrow-left" width={"20%"} />
      <HeaderLabelContainer width={"75%"} marginLeft={"15%"}>
        <Text text_variant="headers_label">{caption}</Text>
      </HeaderLabelContainer>
    </FlexibleContainer>
  );
};
