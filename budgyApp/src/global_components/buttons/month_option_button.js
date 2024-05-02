import React from "react";

import { OPTButton } from "./buttons.styles";
import { Text } from "../../infrastructure/typography/text.component";
import { OptionButtonTextIconContainer } from "../buttons/buttons.styles";
import { Spacer } from "../optimized.spacer.component";
import { SVGComponent } from "../image_components/svg.component";

export const MonthOptionButton = ({
  action,
  caption,
  color,
  width,
  height,
  borderRadius,
  isActive,
  isDisabled,
}) => {
  return (
    <OPTButton
      color={color}
      onPress={action}
      width={width}
      height={height}
      borderRadius={borderRadius}
      isActive={isActive}
    >
      <OptionButtonTextIconContainer>
        <Spacer position="left" size="large">
          <Text
            text_variant={
              isActive
                ? "white_bold_text_20"
                : isDisabled
                ? "neutral_bold_text_20"
                : "bold_text_20"
            }
          >
            {caption}
          </Text>
        </Spacer>
        <>
          <Spacer position="left" size="medium" />
          {isActive && (
            <SVGComponent
              icon_name="SuccessIcon"
              icon_width={20}
              icon_height={20}
              position={"static"}
              left={"0%"}
              top={"0%"}
              justify={"center"}
            />
          )}
        </>
      </OptionButtonTextIconContainer>
    </OPTButton>
  );
};
