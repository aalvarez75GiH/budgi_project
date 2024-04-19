import React from "react";

import {
  CTAButtonPlusIcon,
  CTAButtonPlusIconContainer,
  CTAButtonPlusIconCaption,
  CTAButtonPlusIconRNPContainer,
} from "./buttons.styles";
import { Text } from "../../infrastructure/typography/text.component";
import { theme } from "../../infrastructure/theme";
import { RNPIconButton } from "./RNP_icon_button";

export const RegularCTAButtonPlusIcon = ({
  action,
  caption,
  color,
  width,
  height,
  borderRadius,
  text_variant,
}) => {
  return (
    <CTAButtonPlusIcon
      color={color}
      onPress={action}
      width={width}
      height={height}
      borderRadius={borderRadius}
    >
      <CTAButtonPlusIconContainer>
        <CTAButtonPlusIconCaption>
          <Text text_variant={text_variant}>{caption}</Text>
        </CTAButtonPlusIconCaption>
        <CTAButtonPlusIconRNPContainer>
          <RNPIconButton
            action={() => null}
            icon="chevron-right"
            width={"0%"}
            color={theme.colors.brand.primary}
          />
        </CTAButtonPlusIconRNPContainer>
      </CTAButtonPlusIconContainer>
    </CTAButtonPlusIcon>
  );
};
