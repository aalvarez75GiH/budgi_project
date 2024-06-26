import React, { useState, useContext } from "react";

import { Text } from "../../../infrastructure/typography/text.component";
import { HeaderLabelContainer } from "./headers.styles";
import { ClickableFlexibleContainer } from "../../containers/clickable_flexible_container";
import { AuthenticationContext } from "../../../infrastructure/services/authentication/authentication.context";

export const DoneHeaderComponent = ({ action, color, flexibility }) => {
  const { language } = useContext(AuthenticationContext);

  const caption = language === "english" ? "Done" : "Listo";
  return (
    <ClickableFlexibleContainer
      onPress={action}
      color={color}
      direction="row"
      flexibility={flexibility}
      justify={"center"}
    >
      <HeaderLabelContainer width={"100%"} marginLeft={"10%"}>
        <Text text_variant="bold_text_20">{caption}</Text>
      </HeaderLabelContainer>
    </ClickableFlexibleContainer>
  );
};
