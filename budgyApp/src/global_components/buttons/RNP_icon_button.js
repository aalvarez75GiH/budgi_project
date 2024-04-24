import React from "react";

import { theme } from "../../infrastructure/theme";
import { RNPIconBtn, RNPIconButtonContainer } from "./buttons.styles";

export const RNPIconButton = ({
  navigation,
  action,
  icon,
  width,
  color,
  align,
}) => {
  return (
    <RNPIconButtonContainer width={width} align={align}>
      <RNPIconBtn
        icon={icon}
        size={30}
        color={theme.colors.brand.primary}
        // color={"red"}
        onPress={action}
        iconColor={color}
      />
    </RNPIconButtonContainer>
  );
};
