import React, { useContext } from "react";
import { ActivityIndicator } from "react-native-paper";

import { CTAButtonContainer, CTAButton } from "./buttons.styles";
import { Text } from "../../infrastructure/typography/text.component";
import { theme } from "../../infrastructure/theme";
import { AuthenticationContext } from "../../infrastructure/services/authentication/authentication.context";

export const RegularCTAButton = ({
  action,
  caption,
  color,
  isLoading,
  width,
  height,
  borderRadius,
  text_variant,
  top_position,
}) => {
  const { colors } = theme;
  const { text } = colors;
  const { p_142223C, s_FFFFFF } = text;

  return (
    // <CTAButtonContainer top_position={top_position}>
    <CTAButton
      color={color}
      onPress={action}
      width={width}
      height={height}
      borderRadius={borderRadius}
    >
      {isLoading ? (
        <ActivityIndicator
          color={text_variant === "cta_dark_caption" ? p_142223C : s_FFFFFF}
        />
      ) : (
        <Text text_variant={text_variant}>{caption}</Text>
      )}

      {/* <Text text_variant={text_variant}>{caption}</Text> */}
    </CTAButton>
    // </CTAButtonContainer>
  );
};
