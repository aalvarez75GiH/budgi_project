import React, { useState, useContext } from "react";

import { Text } from "../../../infrastructure/typography/text.component";
import { HeaderLabelContainer } from "./headers.styles";
import { RNPIconButton } from "../../buttons/RNP_icon_button";
import { AuthenticationContext } from "../../../infrastructure/services/authentication/authentication.context";
import { FlexibleContainer } from "../../containers/flexible_container";

export const BackHeaderComponent = ({
  navigation,
  color,
  action,
  align,
  flexibility,
}) => {
  const { language } = useContext(AuthenticationContext);

  const caption = language === "english" ? "Back" : "Atrás";
  return (
    <FlexibleContainer
      color={color}
      direction="row"
      flexibility={flexibility}
      justify={"center"}
    >
      <RNPIconButton
        action={action}
        icon="arrow-left"
        width={"10%"}
        align={align}
      />
      <HeaderLabelContainer width={"75%"} marginLeft={"5%"}>
        <Text text_variant="bold_text_20">{caption}</Text>
      </HeaderLabelContainer>
    </FlexibleContainer>
  );
};
